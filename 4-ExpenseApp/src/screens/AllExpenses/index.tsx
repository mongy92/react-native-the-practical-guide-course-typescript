import { StyleSheet, View } from 'react-native';
import React from 'react';
import { testIDs } from '../../constants/testIDs';
import ExpensesList from '../../components/ExpensesList';
import { useExpenses } from '../../contexts/ExpensesContext';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { getExpensesTotalAmount } from '../../utils/expenses';
import { GlobalStyles } from '../../constants/styles';

const AllExpenses = () => {
  const { expenses } = useExpenses();
  return (
    <View style={styles.container} testID={testIDs.allExpensesScreen}>
      <ExpensesSummary
        totalAmount={getExpensesTotalAmount(expenses)}
        periodName={'Total'}
      />
      <ExpensesList data={expenses} />
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  }
});
