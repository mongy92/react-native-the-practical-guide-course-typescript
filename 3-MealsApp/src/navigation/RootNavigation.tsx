import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/Categories';
import MealsScreen from '../screens/Meals';
import { RootNavigationStackParams } from './types';

const Stack = createNativeStackNavigator<RootNavigationStackParams>();

export const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Categories' component={CategoriesScreen} />
      <Stack.Screen name='Meals' component={MealsScreen} />
    </Stack.Navigator>
  );
};
