import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { FC, useState } from 'react';
import Title from '../components/Title';
import { COLORS } from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';
import InstructionText from '../components/InstructionText';
import Card from '../components/Card';

interface Props {
  userNumber: number;
  onGameOver(): void;
}

function generateRandomNumber(
  min: number,
  max: number,
  exclude: number
): number {
  const generated = Math.floor(Math.random() * (max - min)) + min;
  if (generated === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return generated;
  }
}

let MIN = 1;
let MAX = 100;

const GameScreen: FC<Props> = ({ userNumber, onGameOver }) => {
  const [guessedNumber, setGuessedNumber] = useState(() =>
    generateRandomNumber(MIN, MAX, userNumber)
  );

  function guessNewNumber(type: 'higher' | 'lower') {
    if (
      (type === 'higher' && guessedNumber > userNumber) ||
      (type === 'lower' && guessedNumber < userNumber)
    ) {
      return Alert.alert('Dont Lie ;)', 'You know that this is wrong..', [
        { text: 'Sorry', style: 'cancel' }
      ]);
    }
    if (type === 'higher') {
      MIN = guessedNumber;
    } else {
      MAX = guessedNumber;
    }
    const newNumber = generateRandomNumber(MIN, MAX, guessedNumber);
    setGuessedNumber(newNumber);
    if (newNumber === userNumber) {
      onGameOver();
    }
  }

  function onPressPlus() {
    guessNewNumber('higher');
  }

  function onPressMinus() {
    guessNewNumber('lower');
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{guessedNumber}</Text>
      </View>
      <Card>
        <InstructionText>Higher or Lower</InstructionText>
        <View>
          <PrimaryButton onPress={onPressMinus}>-</PrimaryButton>
          <PrimaryButton onPress={onPressPlus}>+</PrimaryButton>
        </View>
      </Card>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  numberContainer: {
    padding: 24,
    borderWidth: 4,
    borderColor: COLORS.secondary500,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.secondary500
  },
  buttons: {
    flexDirection: 'row'
  }
});
