import { Expense } from '../types/Expense';

export function getExpensesTotalAmount(expenses: Expense[]) {
  const total = expenses.reduce((sum, ex) => ex.amount + sum, 0);
  return total.toFixed(2).toString();
}

export function getExpensesLastnDayes(expenses: Expense[], days: number) {
  const today = new Date();
  const date = new Date();
  date.setDate(date.getDate() - days);
  return expenses.filter((ex) => ex.date >= date && ex.date <= today);
}
