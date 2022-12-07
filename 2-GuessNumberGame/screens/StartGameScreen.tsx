import { Alert, StyleSheet, TextInput, View } from 'react-native';
import React, { FC, useState } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/colors';
import Card from '../components/Card';
import Title from '../components/Title';
import InstructionText from '../components/InstructionText';

interface Props {
  onPickNumber(number: number): void;
}

const StartGameScreen: FC<Props> = ({ onPickNumber }) => {
  const [number, setNumber] = useState('');
  function resetNumber() {
    setNumber('');
  }
  function onConfirm() {
    const enteredNumber = parseInt(number);
    if (isNaN(enteredNumber) || enteredNumber > 99 || enteredNumber < 0) {
      return Alert.alert(
        'Invalid Number',
        'please enter valid number between 0-99',
        [
          {
            text: 'Ok',
            style: 'destructive',
            onPress: resetNumber
          }
        ]
      );
    }
    onPickNumber(enteredNumber);
  }
  return (
    <View style={styles.container}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter Number</InstructionText>
        <TextInput
          style={styles.input}
          maxLength={2}
          keyboardType='number-pad'
          autoCapitalize='none'
          autoCorrect={false}
          cursorColor={COLORS.white}
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
      </Card>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },
  input: {
    width: 50,
    height: 50,
    borderBottomColor: COLORS.secondary500,
    borderBottomWidth: 2,
    marginVertical: 8,
    fontSize: 32,
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.secondary500,
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    flex: 1
  }
});
