import { useNavigation, useRoute } from '@react-navigation/native';
import ManageExpense from '..';
import { fireEvent, render } from '../../../../jest/test-utils';
import { testIDs } from '../../../constants/testIDs';
import { mockedExpenses } from '../../../mocks/mockedExpenses';
import { formatDateYYYYMMDD } from '../../../utils/date';

const mockedFn = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedFn,
      goBack: mockedFn
    }),
    useRoute: jest.fn().mockReturnValue({ params: {} })
  };
});

describe('ManageExpense', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(<ManageExpense />);
    getByTestId(testIDs.manageExpenseScreen);
  });

  test('should have ExpenseForm and all inputs', () => {
    const { getByTestId } = render(<ManageExpense />);
    getByTestId(testIDs.manageExpenseForm);
    getByTestId(testIDs.amountInput);
    getByTestId(testIDs.dateInput);
    getByTestId(testIDs.descriptionInput);
  });

  test('should have Cancel button and user can close the screen', () => {
    const navigation = useNavigation();
    const { getByText } = render(<ManageExpense />);
    const cancelButton = getByText('Cancel');
    fireEvent.press(cancelButton);
    expect(navigation.goBack).toHaveBeenCalled();
  });

  describe('Update Expense', () => {
    test('should auto fill the data and the user should be able to update epxense', () => {
      const selectedExpense = mockedExpenses[0];
      const navigation = useNavigation();
      //@ts-ignore
      useRoute().params = {
        expenseId: selectedExpense.id
      };

      const { getByText, getByTestId } = render(<ManageExpense />);
      const amountInput = getByTestId(testIDs.amountInput);
      const dateInput = getByTestId(testIDs.dateInput);
      const descriptionInput = getByTestId(testIDs.descriptionInput);
      expect(amountInput).toHaveProp(
        'value',
        selectedExpense.amount.toString()
      );

      expect(dateInput).toHaveProp(
        'value',
        formatDateYYYYMMDD(selectedExpense.date)
      );

      expect(descriptionInput).toHaveProp('value', selectedExpense.description);

      fireEvent.changeText(amountInput, 'test');
      fireEvent.changeText(dateInput, '2022-12-12');
      fireEvent.changeText(descriptionInput, 'test');

      const updateButton = getByText('Update');
      fireEvent.press(updateButton);
      expect(navigation.goBack).toBeCalled();
    });
  });

  describe('Add new Expense', () => {
    test('should have the confirm button and the use can add new expense for valid inputs', () => {
      //@ts-ignore
      useRoute().params = {};
      const navigation = useNavigation();
      const { getByTestId, getByText } = render(<ManageExpense />);
      const amountInput = getByTestId(testIDs.amountInput);
      const dateInput = getByTestId(testIDs.dateInput);
      const descriptionInput = getByTestId(testIDs.descriptionInput);
      fireEvent.changeText(amountInput, '12');
      fireEvent.changeText(dateInput, '2022-12-12');
      fireEvent.changeText(descriptionInput, 'test');

      const confirmButton = getByText('Confirm');
      fireEvent.press(confirmButton);
      expect(navigation.goBack).toHaveBeenCalled();
    });
  });

  test('should have the delete icon and user can delete expense', () => {
    //@ts-ignore
    useRoute().params = {
      expenseId: mockedExpenses[0].id
    };
    const navigation = useNavigation();
    const { getByTestId } = render(<ManageExpense />);
    const deleteButton = getByTestId(testIDs.deleteButton);
    fireEvent.press(deleteButton);
    expect(navigation.navigate).toHaveBeenCalledWith();
  });

  test('should show error message for invalid inputs or missing inputs', () => {
    //@ts-ignore
    useRoute().params = {};
    const navigation = useNavigation();
    const { getByTestId, getByText } = render(<ManageExpense />);
    const amountInput = getByTestId(testIDs.amountInput);
    const dateInput = getByTestId(testIDs.dateInput);
    fireEvent.changeText(amountInput, '12');
    fireEvent.changeText(dateInput, '2022-12-12');

    const confirmButton = getByText('Confirm');
    fireEvent.press(confirmButton);
    expect(navigation.goBack).not.toHaveBeenCalled();
    getByText(/Invalid input values - please check your entered data!/);
  });
});
