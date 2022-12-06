import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export interface Goal {
  id: number;
  text: string;
}

interface Props {
  item: Goal;
  onDeleteGoal(id: number): void;
}

const GoalItem: React.FC<Props> = ({ item, onDeleteGoal }) => {
  function deleteGoalHandler() {
    onDeleteGoal(item.id);
  }
  return (
    <Pressable
      onPress={deleteGoalHandler}
      style={({ pressed }) => pressed && styles.pressedStyle}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{item.text}</Text>
      </View>
    </Pressable>
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
  },
  pressedStyle: {
    opacity: 0.5
  }
});
