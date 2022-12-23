import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '../../../../jest/test-utils';
import { testIDs } from '../../../constants/testIDs';
import { mockedExpenses } from '../../../mocks/mockedExpenses';
import { formatDateYYYYMMDD } from '../../../utils/date';
import { getExpensesTotalAmount } from '../../../utils/expenses';
import AllExpenses from '..';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate
    })
  };
});

describe('AllExpenses', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(<AllExpenses />);
    getByTestId(testIDs.allExpensesScreen);
  });
  test('should render list of all expenses', () => {
    const { getByText } = render(<AllExpenses />);

    getByText('Total');
    getByText(`$${getExpensesTotalAmount(mockedExpenses)}`);
    mockedExpenses.forEach((ex) => {
      getByText(ex.amount.toFixed(2).toString());
      getByText(formatDateYYYYMMDD(ex.date));
      getByText(ex.description);
    });
  });

  test('should navigate to ManageExpense on press item', () => {
    const navigation = useNavigation();
    const { getByText } = render(<AllExpenses />);
    const item = getByText(mockedExpenses[0].description);
    fireEvent.press(item);
    expect(navigation.navigate).toHaveBeenCalledWith('ManageExpense', {
      expenseId: mockedExpenses[0].id
    });
  });
});
