import { StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { testIDs } from '../../constants/testIDs';
import ExpensesList from '../../components/ExpensesList';
import { useExpenses } from '../../contexts/ExpensesContext';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import {
  getExpensesLastnDayes,
  getExpensesTotalAmount
} from '../../utils/expenses';
import { GlobalStyles } from '../../constants/styles';
import { fetchExpenses } from '../../utils/http';
import ErrorOverlay from '../../components/ErrorOverlay';
import LoadingOverlay from '../../components/LoadingOverlay';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string>();

  const { expenses, setExpenses } = useExpenses();
  const filteredExpenses = useMemo(
    () => getExpensesLastnDayes(expenses, 7),
    [expenses]
  );

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (e) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
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
