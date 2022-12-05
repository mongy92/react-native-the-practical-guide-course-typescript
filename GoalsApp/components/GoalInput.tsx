import { Button, Modal, StyleSheet, TextInput, View } from 'react-native';
import React, { FC, useState } from 'react';

interface Props {
  onAddGoal(text: string): void;
  visible: boolean;
  onClose(): void;
}

const GoalInput: FC<Props> = ({ onAddGoal, visible, onClose }) => {
  const [inputText, setInputText] = useState('');

  function addGoalHandler() {
    onAddGoal(inputText);
    setInputText('');
  }

  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Enter your goal!'
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
        />
        <View style={styles.buttons}>
          <Button
            title='Add goal'
            onPress={addGoalHandler}
            disabled={inputText.trim().length === 0}
          />
          <Button title='Cancel' onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16
  }
});
