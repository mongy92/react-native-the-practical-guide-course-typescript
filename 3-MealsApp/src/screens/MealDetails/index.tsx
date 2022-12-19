import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { GlobalNavigationParams } from '../../navigation/types';
import { mockedMeals } from '../../mocks/mocked-meals';
import { testIDs } from '../../constants/testIDs';
import { MealDetails } from '../../components/MealDetails';
import { List } from '../../components/List';

const MealDetailsScreen = () => {
  const {
    params: { mealId }
  } = useRoute<RouteProp<GlobalNavigationParams, 'MealDetails'>>();

  const selectedMeal = useMemo(
    () => mockedMeals.find((m) => m.id === mealId)!,
    [mealId]
  );
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
