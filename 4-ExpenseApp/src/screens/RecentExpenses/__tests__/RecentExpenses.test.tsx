import { useNavigation } from '@react-navigation/native';
import RecentExpenses from '..';
import { fireEvent, render, waitFor } from '../../../../jest/test-utils';
import { testIDs } from '../../../constants/testIDs';
import { mockedExpensesArray } from '../../../mocks/mockedExpenses';
import { formatDateYYYYMMDD } from '../../../utils/date';
import {
  getExpensesLastnDayes,
  getExpensesTotalAmount
} from '../../../utils/expenses';
import MockDate from 'mockdate';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import { BASE_URL } from '../../../utils/http';

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

MockDate.set('2022-12-15');
describe('RecentExpenses', () => {
  test('should render correctly', () => {
    render(<RecentExpenses />);
  });
  test('should show loading during fetching the expenses from the api', async () => {
    const { getByTestId, queryByTestId } = render(<RecentExpenses />);
    getByTestId(testIDs.loading);
    expect(queryByTestId(testIDs.recentExpensesScreen)).toBeNull();

    await waitFor(() => {
      expect(queryByTestId(testIDs.loading)).toBeNull();
      getByTestId(testIDs.recentExpensesScreen);
    });
  });
  test('should render list of recent expenses', async () => {
    const { getByText } = render(<RecentExpenses />);
    await waitFor(() => {
      const expensesLatest7Days = getExpensesLastnDayes(mockedExpensesArray, 7);
      getByText('Last 7 Days');
      getByText(`$${getExpensesTotalAmount(expensesLatest7Days)}`);
      expensesLatest7Days.forEach((ex) => {
        getByText(ex.amount.toFixed(2).toString());
        getByText(formatDateYYYYMMDD(ex.date));
        getByText(ex.description);
      });
    });
  });

  test('should navigate to ManageExpense on press item', async () => {
    const navigation = useNavigation();
    const { getByText } = render(<RecentExpenses />);
    const expensesLatest7Days = getExpensesLastnDayes(mockedExpensesArray, 7);
    await waitFor(() => {
      const item = getByText(expensesLatest7Days[0].description);
      fireEvent.press(item);
      expect(navigation.navigate).toHaveBeenCalledWith('ManageExpense', {
        expenseId: expensesLatest7Days[0].id
      });
    });
  });

  test('should show error if the request fail', async () => {
    server.resetHandlers(
      rest.get(`${BASE_URL}/expenses.json`, (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    const { getByText, debug } = render(<RecentExpenses />);
    await waitFor(() => {
      getByText(/An error occurred!/);
    });
  });
});
