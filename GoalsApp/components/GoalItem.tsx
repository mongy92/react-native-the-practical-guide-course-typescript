import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export interface Goal {
  id: number;
  text: string;
}

interface Props {
  item: Goal;
}

const GoalItem: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{item.text}</Text>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: '#5e0acc',
    margin: 8,
    padding: 8,
    borderRadius: 8
  },
  goalText: {
    color: '#FFF'
  }
});
