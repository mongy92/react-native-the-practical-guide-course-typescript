import { Expense } from '../types/Expense';

export function getExpensesTotalAmount(expenses: Expense[]) {
  const total = expenses.reduce((sum, ex) => ex.amount + sum, 0);
  return total.toFixed(2).toString();
}
