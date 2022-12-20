import React, { useLayoutEffect, useMemo } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { GlobalNavigationParams } from '../../navigation/types';
import { mockedMeals } from '../../mocks/mocked-meals';
import { MealList } from '../../components/MealList';

const MealsScreen = () => {
  const { params } = useRoute<RouteProp<GlobalNavigationParams, 'Meals'>>();
  const navigation = useNavigation<NavigationProp<GlobalNavigationParams>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.title
    });
  }, []);

  const meals = useMemo(
    () =>
      mockedMeals.filter(
        (meal) => meal.categoryIds.indexOf(params.categoryId) >= 0
      ),
    [params]
  );

  return <MealList meals={meals} />;
};

export default MealsScreen;
