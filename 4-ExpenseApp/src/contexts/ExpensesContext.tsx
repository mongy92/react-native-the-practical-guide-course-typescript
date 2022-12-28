import {
  createContext,
  PropsWithChildren,
  FC,
  useState,
  useContext
} from 'react';
import { Expense } from '../types/Expense';

type ExpenseContextType = {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, expense: Expense) => void;
  deleteExpense: (id: string) => void;
};

const EMPTY_FUNC = () => {};

const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: EMPTY_FUNC,
  updateExpense: EMPTY_FUNC,
  deleteExpense: EMPTY_FUNC,
  setExpenses: EMPTY_FUNC
});

const ExpenseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  function addExpense(expense: Expense) {
    setExpenses((prev) => [
      { id: (new Date().getTime() + Math.random()).toString(), ...expense },
      ...prev
    ]);
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
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        setExpenses
      }}
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
