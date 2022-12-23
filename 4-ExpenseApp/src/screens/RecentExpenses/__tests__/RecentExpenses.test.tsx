import { useNavigation } from '@react-navigation/native';
import RecentExpenses from '..';
import { fireEvent, render } from '../../../../jest/test-utils';
import { testIDs } from '../../../constants/testIDs';
import { mockedExpenses } from '../../../mocks/mockedExpenses';
import { formatDateYYYYMMDD } from '../../../utils/date';
import {
  getExpensesLastnDayes,
  getExpensesTotalAmount
} from '../../../utils/expenses';

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

describe.only('RecentExpenses', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(<RecentExpenses />);
    getByTestId(testIDs.recentExpensesScreen);
  });
  test('should render list of recent expenses', () => {
    const { getByText } = render(<RecentExpenses />);

    const expensesLatest7Days = getExpensesLastnDayes(mockedExpenses, 7);
    getByText('Last 7 Days');
    getByText(`$${getExpensesTotalAmount(expensesLatest7Days)}`);
    expensesLatest7Days.forEach((ex) => {
      getByText(ex.amount.toFixed(2).toString());
      getByText(formatDateYYYYMMDD(ex.date));
      getByText(ex.description);
    });
  });

  test('should navigate to ManageExpense on press item', () => {
    const navigation = useNavigation();
    const expensesLatest7Days = getExpensesLastnDayes(mockedExpenses, 7);
    const { getByText } = render(<RecentExpenses />);
    const item = getByText(expensesLatest7Days[0].description);
    fireEvent.press(item);
    expect(navigation.navigate).toHaveBeenCalledWith('ManageExpense', {
      expenseId: expensesLatest7Days[0].id
    });
  });
});
