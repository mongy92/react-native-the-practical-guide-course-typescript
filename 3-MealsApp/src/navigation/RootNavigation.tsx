import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealDetailsScreen from '../screens/MealDetails';
import MealsScreen from '../screens/Meals';
import { DrawerNavigation } from './DrawerNavigation';
import { RootNavigationStackParams } from './types';

const Stack = createNativeStackNavigator<RootNavigationStackParams>();

export const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Drawer'
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Meals' component={MealsScreen} />
      <Stack.Screen name='MealDetails' component={MealDetailsScreen} />
    </Stack.Navigator>
  );
};
