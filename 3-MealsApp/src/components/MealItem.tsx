import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { FC } from 'react';
import { Meal } from '../types/Meal';
import { MealDetails } from './MealDetails';

interface Props {
  item: Meal;
  onPress(item: Meal): void;
}

export const MealItem: FC<Props> = ({ item, onPress }) => {
  function pressHandler() {
    onPress(item);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={pressHandler}
      style={styles.item}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <MealDetails
        duration={item.duration}
        affordability={item.affordability}
        complexity={item.complexity}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: '#FFF'
  },
  image: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 8,
    textAlign: 'center'
  }
});
