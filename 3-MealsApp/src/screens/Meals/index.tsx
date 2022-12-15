import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useMemo } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { RootNavigationStackParams } from '../../navigation/types';
import { testIDs } from '../../constants/testIDs';
import { mockedMeals } from '../../mocks/mocked-meals';
import { Meal } from '../../types/Meal';
import { MealItem } from '../../components/MealItem';

const MealsScreen = () => {
  const { params } = useRoute<RouteProp<RootNavigationStackParams, 'Meals'>>();
  const navigation = useNavigation<NavigationProp<RootNavigationStackParams>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.title
    });
  }, []);

  function onPressMeal(item: Meal) {
    navigation.navigate('MealDetails', {
      mealId: item.id
    });
  }

  function renderItem({ item }: ListRenderItemInfo<Meal>) {
    return <MealItem item={item} onPress={onPressMeal} />;
  }

  const meals = useMemo(
    () =>
      mockedMeals.filter(
        (meal) => meal.categoryIds.indexOf(params.categoryId) >= 0
      ),
    [params]
  );

  return (
    <FlatList
      testID={testIDs.mealsScreen}
      data={meals}
      renderItem={renderItem}
    />
  );
};

export default MealsScreen;

const styles = StyleSheet.create({});
