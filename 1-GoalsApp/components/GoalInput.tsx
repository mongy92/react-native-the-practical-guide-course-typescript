import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  View,
  Image
} from 'react-native';
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
        <Image
          source={require('../assets/images/goal.png')}
          style={styles.image}
        />
        <TextInput
          placeholder='Enter your goal!'
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
        />
        <View style={styles.buttons}>
          <Button title='Cancel' onPress={onClose} color='#F31282' />

          <Button
            title='Add goal'
            onPress={addGoalHandler}
            disabled={inputText.trim().length === 0}
            color='#B180F0'
          />
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
    padding: 16,
    backgroundColor: '#311b6b'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 24,
    alignSelf: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    borderRadius: 8,
    padding: 8
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16
  }
});
