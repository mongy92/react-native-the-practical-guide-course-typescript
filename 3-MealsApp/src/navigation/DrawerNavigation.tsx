import { createDrawerNavigator } from '@react-navigation/drawer';
import CategoriesScreen from '../screens/Categories';
import Favorites from '../screens/Favorites';
import { DrawerNavigationParams } from './types';
import Ionicons from '@expo/vector-icons/Ionicons';

const Drawer = createDrawerNavigator<DrawerNavigationParams>();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name='Categories'
        component={CategoriesScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons size={size} color={color} name='list' />
          )
        }}
      />
      <Drawer.Screen
        name='Favorites'
        component={Favorites}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons size={size} color={color} name='star' />
          )
        }}
      />
    </Drawer.Navigator>
  );
};
