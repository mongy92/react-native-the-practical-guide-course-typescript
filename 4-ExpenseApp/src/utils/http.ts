import axios from 'axios';
import { Expense, ExpensesData } from '../types/Expense';
import { formateExpensesToArray } from './expenses';

export const BASE_URL = 'https://rnudemycourse-default-rtdb.firebaseio.com';

export async function addNewExpense(expense: Expense) {
  const response = await axios.post(`${BASE_URL}/expenses.json`, expense);
  const id: string = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get<ExpensesData>(`${BASE_URL}/expenses.json`);

  return formateExpensesToArray(response.data);
}

export function updateExpenseApi(id: string, expense: Expense) {
  return axios.put(`${BASE_URL}/expenses/${id}.json`, expense);
}

export function deleteExpenseApi(id: string) {
  return axios.delete(`${BASE_URL}/expenses/${id}.json`);
}
