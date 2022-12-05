import { useState } from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View
} from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem, { Goal } from './components/GoalItem';

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalModal, setNewGoalModal] = useState(false);

  function openNewGoalModal() {
    setNewGoalModal(true);
  }

  function closeNewGoalModal() {
    setNewGoalModal(false);
  }

  function addGoalHandler(text: string) {
    setGoals((curr) => [...curr, { id: new Date().getTime(), text }]);
    closeNewGoalModal();
  }

  function deleteGoalHandler(goalId: number) {
    setGoals((curr) => curr.filter((goal) => goal.id !== goalId));
  }

  function renderItem({ item }: ListRenderItemInfo<Goal>) {
    return <GoalItem item={item} onDeleteGoal={deleteGoalHandler} />;
  }
  return (
    <View style={styles.container}>
      <Button
        title='Add New Goal'
        onPress={openNewGoalModal}
        color={'#5e0acc'}
      />
      <GoalInput
        onAddGoal={addGoalHandler}
        visible={newGoalModal}
        onClose={closeNewGoalModal}
      />
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
