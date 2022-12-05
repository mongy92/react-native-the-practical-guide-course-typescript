import { Button, StyleSheet, TextInput, View } from 'react-native';
import React, { FC, useState } from 'react';

interface Props {
  onAddGoal(text: string): void;
}

const GoalInput: FC<Props> = ({ onAddGoal }) => {
  const [inputText, setInputText] = useState('');

  function addGoalHandler() {
    onAddGoal(inputText);
    setInputText('');
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder='Enter your goal!'
        style={styles.input}
        onChangeText={setInputText}
        value={inputText}
      />
      <Button title='Add goal' onPress={addGoalHandler} />
    </View>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
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
  }
});
