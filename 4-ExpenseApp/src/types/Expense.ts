export interface Expense {
  id?: string;
  amount: number;
  date: Date;
  description: string;
}

export type ExpensesData = {
  [key: string]: Expense;
};
