import { useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import GoalInput from './components/GoalInputs';
import GoalItem, { Goal } from './components/GoalItem';

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);

  function addGoalHandler(text: string) {
    setGoals((curr) => [...curr, { id: new Date().getTime(), text }]);
  }

  function deleteGoalHandler(goalId: number) {
    setGoals((curr) => curr.filter((goal) => goal.id !== goalId));
  }

  function renderItem({ item }: ListRenderItemInfo<Goal>) {
    return <GoalItem item={item} onDeleteGoal={deleteGoalHandler} />;
  }
  return (
    <View style={styles.container}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.list}>
        <FlatList
          data={goals}
          renderItem={renderItem}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60
  },
  list: {
    flex: 1
  }
});
