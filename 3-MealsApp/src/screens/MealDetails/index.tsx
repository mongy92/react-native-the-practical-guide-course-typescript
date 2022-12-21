import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useMemo } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { GlobalNavigationParams } from '../../navigation/types';
import { mockedMeals } from '../../mocks/mocked-meals';
import { testIDs } from '../../constants/testIDs';
import { MealDetails } from '../../components/MealDetails';
import { List } from '../../components/List';
import { useFavorites } from '../../stores/Favorites';
import { Ionicons } from '@expo/vector-icons';

const MealDetailsScreen = () => {
  const {
    params: { mealId }
  } = useRoute<RouteProp<GlobalNavigationParams, 'MealDetails'>>();
  const navigation =
    useNavigation<NavigationProp<GlobalNavigationParams, 'MealDetails'>>();

  const { ids, removeItem, addItem } = useFavorites();

  const selectedMeal = useMemo(
    () => mockedMeals.find((m) => m.id === mealId)!,
    [mealId]
  );

  const isFavorites = useMemo(
    () => ids.findIndex((i) => i === selectedMeal.id) > -1,
    [selectedMeal, ids]
  );

  function onPressFavorite() {
    if (isFavorites) {
      removeItem(selectedMeal.id);
    } else {
      addItem(selectedMeal.id);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name={isFavorites ? 'star' : 'star-outline'}
          size={22}
          color={'orange'}
          onPress={onPressFavorite}
        />
      )
    });
  }, [isFavorites, onPressFavorite]);

  return (
    <ScrollView testID={testIDs.mealDetailsScreen}>
      <Image
        source={{ uri: selectedMeal.imageUrl }}
        testID={testIDs.mealDetailsImage}
        style={styles.image}
      />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
      />
      <List title='Ingredients' data={selectedMeal.ingredients} />
      <List title='Steps' data={selectedMeal.steps} />
    </ScrollView>
  );
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
    marginBottom: 16
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 8
  }
});
