import { Alert, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';

const StartGameScreen = () => {
  const [number, setNumber] = useState('');
  function resetNumber() {
    setNumber('');
  }
  function onConfirm() {
    const enteredNumber = parseInt(number);
    if (isNaN(enteredNumber) || enteredNumber > 99 || enteredNumber < 0) {
      Alert.alert('Invalid Number', 'please enter valid number between 0-99', [
        {
          text: 'Ok',
          style: 'destructive',
          onPress: resetNumber
        }
      ]);
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        maxLength={2}
        keyboardType='number-pad'
        autoCapitalize='none'
        autoCorrect={false}
        cursorColor={'#FFF'}
        value={number}
        onChangeText={setNumber}
      />
      <View style={styles.buttons}>
        <PrimaryButton style={styles.button} onPress={resetNumber}>
          Reset
        </PrimaryButton>
        <PrimaryButton style={styles.button} onPress={onConfirm}>
          Confirm
        </PrimaryButton>
      </View>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: '#3b021f',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 4,
    elevation: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  input: {
    width: 50,
    height: 50,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    marginVertical: 8,
    fontSize: 32,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ddb52f',
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    flex: 1
  }
});
