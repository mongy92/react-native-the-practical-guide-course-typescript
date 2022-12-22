import { NavigationContainer } from '@react-navigation/native';
import ExpenseProvider from './src/contexts/ExpensesContext';
import RootNavigation from './src/navigation/RootNavigation';

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ExpenseProvider>
  );
}
