import { Button, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { testIDs } from '../../constants/testIDs';
import ExpenseForm from '../../components/ExpenseForm';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { GlobalNavigationParams } from '../../navigation/types';
import { useExpenses } from '../../contexts/ExpensesContext';
import { Expense } from '../../types/Expense';
import { GlobalStyles } from '../../constants/styles';
import {
  addNewExpense,
  deleteExpenseApi,
  updateExpenseApi
} from '../../utils/http';

const ManageExpense = () => {
  const { addExpense, updateExpense, expenses, deleteExpense } = useExpenses();
  const { params } =
    useRoute<RouteProp<GlobalNavigationParams, 'ManageExpense'>>();
  const navigation = useNavigation<NavigationProp<GlobalNavigationParams>>();

  const defaultValues = useMemo(() => {
    return expenses.find((e) => e.id === params?.expenseId);
  }, [params, expenses]);

  function onCancel() {
    navigation.goBack();
  }

  async function onSubmit(expense: Expense) {
    if (!!params?.expenseId) {
      updateExpenseApi(params.expenseId, expense);
      updateExpense(params?.expenseId, expense);
    } else {
      const id = await addNewExpense(expense);
      addExpense({ id, ...expense });
    }
    navigation.goBack();
  }

  function onDelete() {
    if (params?.expenseId) {
      deleteExpenseApi(params.expenseId);
      deleteExpense(params?.expenseId);
      navigation.goBack();
    }
  }

  return (
    <View testID={testIDs.manageExpenseScreen} style={styles.container}>
      <ExpenseForm
        onCancel={onCancel}
        submitButtonLabel={params?.expenseId ? 'Update' : 'Confirm'}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />

      {!!params?.expenseId && (
        <View style={styles.deleteContainer}>
          <Button
            title='Delete'
            onPress={onDelete}
            testID={testIDs.deleteButton}
            color={GlobalStyles.colors.error500}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
