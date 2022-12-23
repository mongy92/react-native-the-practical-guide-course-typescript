import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ExpenseProvider from './src/contexts/ExpensesContext';
import RootNavigation from './src/navigation/RootNavigation';

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <ExpenseProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </ExpenseProvider>
    </>
  );
}
