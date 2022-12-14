import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';
import ManageExpense from '../screens/ManageExpense';
import { BottomTabNavigation } from './BottomTabs';
import { RootStackNavigationParams } from './types';

const Stack = createNativeStackNavigator<RootStackNavigationParams>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white'
      }}
    >
      <Stack.Screen
        name='BottomTab'
        component={BottomTabNavigation}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='ManageExpense'
        component={ManageExpense}
        options={{ presentation: 'modal', title: 'Manage Expense' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
