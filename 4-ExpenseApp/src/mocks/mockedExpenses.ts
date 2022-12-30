import { Expense } from '../types/Expense';
import { formateExpensesToArray } from '../utils/expenses';

export const mockedExpenses: { [key: string]: Expense } = {
  e1: {
    id: 'e1',
    amount: 88.5,
    description: 'Book',
    date: new Date('2022-12-12')
  },
  e2: {
    id: 'e2',
    amount: 10.5,
    description: 'new laptop',
    date: new Date('2022-12-20')
  },
  e3: {
    id: 'e3',
    amount: 12.45,
    description: 'Gym',
    date: new Date('2022-12-18')
  },
  e4: {
    id: 'e4',
    amount: 12.9,
    description: 'Mobile',
    date: new Date('2022-12-14')
  },
  e5: {
    id: 'e5',
    amount: 43.88,
    description: 'Tea',
    date: new Date('2022-12-10')
  },
  e6: {
    id: 'e6',
    amount: 55.99,
    description: 'Movie',
    date: new Date('2022-12-05')
  },
  e7: {
    id: 'e7',
    amount: 888,
    description: 'Game',
    date: new Date('2022-12-01')
  }
};

export const mockedExpensesArray = formateExpensesToArray(mockedExpenses);
