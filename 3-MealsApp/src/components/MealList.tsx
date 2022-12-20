import { FlatList, ListRenderItemInfo } from 'react-native';
import React, { FC } from 'react';
import { Meal } from '../types/Meal';
import { testIDs } from '../constants/testIDs';
import { MealItem } from './MealItem';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GlobalNavigationParams } from '../navigation/types';

interface Props {
  meals: Meal[];
}

export const MealList: FC<Props> = ({ meals }) => {
  const navigation = useNavigation<NavigationProp<GlobalNavigationParams>>();

  function onPressMeal(item: Meal) {
    navigation.navigate('MealDetails', {
      mealId: item.id
    });
  }
  function renderItem({ item }: ListRenderItemInfo<Meal>) {
    return <MealItem item={item} onPress={onPressMeal} />;
  }

  return (
    <FlatList
      testID={testIDs.mealsScreen}
      data={meals}
      renderItem={renderItem}
    />
  );
};
