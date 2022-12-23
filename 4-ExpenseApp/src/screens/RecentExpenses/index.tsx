import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { testIDs } from '../../constants/testIDs';
import ExpensesList from '../../components/ExpensesList';
import { useExpenses } from '../../contexts/ExpensesContext';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import {
  getExpensesLastnDayes,
  getExpensesTotalAmount
} from '../../utils/expenses';
import { GlobalStyles } from '../../constants/styles';

const RecentExpenses = () => {
  const { expenses } = useExpenses();
  const filteredExpenses = useMemo(
    () => getExpensesLastnDayes(expenses, 7),
    [expenses]
  );
  return (
    <View style={styles.container} testID={testIDs.recentExpensesScreen}>
      <ExpensesSummary
        totalAmount={getExpensesTotalAmount(filteredExpenses)}
        periodName={'Last 7 Days'}
      />
      <ExpensesList data={filteredExpenses} />
    </View>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  }
});
