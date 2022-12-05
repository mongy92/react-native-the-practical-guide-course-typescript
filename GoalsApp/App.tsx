import { useState } from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

interface GoalType {
  id: number;
  text: string;
}

export default function App() {
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [inputText, setInputText] = useState('');

  function addGoalHandler() {
    setGoals((curr) => [
      ...curr,
      { id: new Date().getTime(), text: inputText }
    ]);
  }

  function renderItem({ item }: ListRenderItemInfo<GoalType>) {
    return (
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{item.text}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Enter your goal!'
          style={styles.input}
          onChangeText={setInputText}
        />
        <Button title='Add goal' onPress={addGoalHandler} />
      </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
    marginBottom: 24,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    padding: 8
  },
  list: {
    flex: 1
  },
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
