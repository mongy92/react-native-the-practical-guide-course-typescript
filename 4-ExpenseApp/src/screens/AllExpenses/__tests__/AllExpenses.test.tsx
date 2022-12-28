import { useNavigation } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '../../../../jest/test-utils';
import { testIDs } from '../../../constants/testIDs';
import { mockedExpensesArray } from '../../../mocks/mockedExpenses';
import { formatDateYYYYMMDD } from '../../../utils/date';
import { getExpensesTotalAmount } from '../../../utils/expenses';
import AllExpenses from '..';
import { server } from '../../../mocks/server';
import { BASE_URL } from '../../../utils/http';
import { rest } from 'msw';

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
  test('should render correctly', async () => {
    const { getByTestId } = render(<AllExpenses />);
    await waitFor(() => {
      getByTestId(testIDs.allExpensesScreen);
    });
  });

  test('should show loading during fetching the expenses from the api', async () => {
    const { getByTestId, queryByTestId } = render(<AllExpenses />);
    getByTestId(testIDs.loading);
    expect(queryByTestId(testIDs.allExpensesScreen)).toBeNull();

    await waitFor(() => {
      expect(queryByTestId(testIDs.loading)).toBeNull();
      getByTestId(testIDs.allExpensesScreen);
    });
  });
  test('should render list of all expenses', async () => {
    const { getByText } = render(<AllExpenses />);

    await waitFor(() => {
      getByText('Total');
      getByText(`$${getExpensesTotalAmount(mockedExpensesArray)}`);
      mockedExpensesArray.forEach((ex) => {
        getByText(ex.amount.toFixed(2).toString());
        getByText(formatDateYYYYMMDD(ex.date));
        getByText(ex.description);
      });
    });
  });

  test('should navigate to ManageExpense on press item', async () => {
    const navigation = useNavigation();
    const { getByText } = render(<AllExpenses />);

    await waitFor(() => {
      const item = getByText(mockedExpensesArray[0].description);
      fireEvent.press(item);
      expect(navigation.navigate).toHaveBeenCalledWith('ManageExpense', {
        expenseId: mockedExpensesArray[0].id
      });
    });
  });
  test('should show error if the request fail', async () => {
    server.resetHandlers(
      rest.get(`${BASE_URL}/expenses.json`, (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    const { getByText, debug } = render(<AllExpenses />);
    await waitFor(() => {
      getByText(/An error occurred!/);
    });
  });
});
