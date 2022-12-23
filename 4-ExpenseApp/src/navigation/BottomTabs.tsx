import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from '../screens/AllExpenses';
import RecentExpenses from '../screens/RecentExpenses';
import { BottomTabParams } from './types';
import { Ionicons } from '@expo/vector-icons';
import { testIDs } from '../constants/testIDs';
import { TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../constants/styles';

const BottomTab = createBottomTabNavigator<BottomTabParams>();

export const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <TouchableOpacity
            testID={testIDs.addExpenseIcon}
            onPress={() => navigation.navigate('ManageExpense')}
          >
            <Ionicons name='add' size={24} color={tintColor} />
          </TouchableOpacity>
        )
      })}
    >
      <BottomTab.Screen
        name='Recent'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='hourglass' size={size} color={color} />
          )
        }}
      />
      <BottomTab.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='calendar' size={size} color={color} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
};
