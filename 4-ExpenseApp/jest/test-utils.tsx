import { NavigationContainer } from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import { PropsWithChildren, ReactElement } from 'react';
import ExpenseProvider from '../src/contexts/ExpensesContext';

function AllProviders({ children }: PropsWithChildren) {
  return (
    <ExpenseProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </ExpenseProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: AllProviders,
    ...options
  });

export * from '@testing-library/react-native';

export { customRender as render };
