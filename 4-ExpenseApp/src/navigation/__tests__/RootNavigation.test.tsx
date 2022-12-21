import { fireEvent, render } from '../../../jest/test-utils';
import { testIDs } from '../../constants/testIDs';
import RootNavigation from '../RootNavigation';

describe('RootNavigation', () => {
  test('should render correctly & default screen Recent', () => {
    const { getByText } = render(<RootNavigation />);
    getByText('Recent Expenses');
  });
  test('should render two tabs and moving between them', () => {
    const { getByText } = render(<RootNavigation />);
    const allTab = getByText('All');
    const recentTab = getByText('Recent');

    fireEvent.press(allTab);
    getByText('All Expenses');
    fireEvent.press(recentTab);
    getByText('Recent Expenses');
  });
  test('should Add expense Icon, navigate to MangeExpense screen', async () => {
    const { getByTestId } = render(<RootNavigation />);
    const addIcon = getByTestId(testIDs.addExpenseIcon);
    fireEvent.press(addIcon);
    getByTestId(testIDs.manageExpenseScreen);
  });
});
