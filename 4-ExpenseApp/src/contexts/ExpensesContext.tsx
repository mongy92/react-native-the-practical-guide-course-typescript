import {
  createContext,
  PropsWithChildren,
  FC,
  useState,
  useContext
} from 'react';
import { mockedExpenses } from '../mocks/mockedExpenses';
import { Expense } from '../types/Expense';

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, expense: Expense) => void;
  deleteExpense: (id: string) => void;
};

const EMPTY_FUNC = () => {};

const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: EMPTY_FUNC,
  updateExpense: EMPTY_FUNC,
  deleteExpense: EMPTY_FUNC
});

const ExpenseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(mockedExpenses);

  function addExpense(expense: Expense) {
    setExpenses((prev) => [expense, ...prev]);
  }

  function updateExpense(id: string, expense: Expense) {
    setExpenses((prev) => {
      return prev.map((exp) => {
        if (exp.id === id) {
          exp = { ...exp, ...expense };
        }
        return exp;
      });
    });
  }

  function deleteExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, updateExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  return context;
};

export default ExpenseProvider;
