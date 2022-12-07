import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
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
  useEffect(() => {
    MIN = 1;
    MAX = 100;
  }, []);
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
        <View style={styles.buttons}>
          <PrimaryButton onPress={onPressMinus} style={styles.button}>
            <Ionicons name='md-remove' size={24} color={COLORS.white} />
          </PrimaryButton>
          <PrimaryButton onPress={onPressPlus} style={styles.button}>
            <Ionicons name='md-add' size={24} color={COLORS.white} />
          </PrimaryButton>
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
    flexDirection: 'row',
    marginTop: 8
  },
  button: {
    flex: 1
  }
});
