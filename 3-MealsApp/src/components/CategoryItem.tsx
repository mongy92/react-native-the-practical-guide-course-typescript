import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { Category } from '../types/Category';

interface Props {
  category: Category;
  onPress: (category: Category) => void;
}

export const CategoryItem: FC<Props> = ({ category, onPress }) => {
  function pressHandler() {
    onPress(category);
  }
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={pressHandler}
      style={[styles.item, { backgroundColor: category.color }]}
    >
      <Text style={styles.text}>{category.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 150,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    borderRadius: 8,
    elevation: 4,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18
  }
});
