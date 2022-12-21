import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useFavorites } from '../../stores/Favorites';
import { mockedMeals } from '../../mocks/mocked-meals';
import { MealList } from '../../components/MealList';

const Favorites = () => {
  const { ids } = useFavorites();

  const favorites = useMemo(
    () => mockedMeals.filter((m) => ids.includes(m.id)),
    [ids]
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No favorites meals added</Text>
      </View>
    );
  }
  return <MealList meals={favorites} />;
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18
  }
});
