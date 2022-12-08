import {
  Alert,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Title from '../components/Title';
import { COLORS } from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';
import InstructionText from '../components/InstructionText';
import Card from '../components/Card';
import GuessLogItem from '../components/GuessLogItem';
import { isSmallDevice } from '../utils/dimensions';

interface Props {
  userNumber: number;
  onGameOver(rounds: number): void;
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
  const initialGuess = useMemo(
    () => generateRandomNumber(MIN, MAX, userNumber),
    []
  );
  const [guessedNumber, setGuessedNumber] = useState(initialGuess);

  const [rounds, setRounds] = useState<number[]>([initialGuess]);
  useEffect(() => {
    MIN = 1;
    MAX = 100;
  }, []);

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
    setRounds((prev) => [newNumber, ...prev]);
    if (newNumber === userNumber) {
      onGameOver(rounds.length);
    }
  }

  function onPressPlus() {
    guessNewNumber('higher');
  }

  function onPressMinus() {
    guessNewNumber('lower');
  }

  function renderItem({ index, item }: ListRenderItemInfo<number>) {
    const roundNumber = rounds.length - index;
    return <GuessLogItem guessNmuber={item} roundNumber={roundNumber} />;
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
      <View style={styles.list}>
        <FlatList data={rounds} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default GameScreen;

const { width: deviceWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  numberContainer: {
    padding: isSmallDevice ? 12 : 24,
    borderWidth: 4,
    borderColor: COLORS.secondary500,
    borderRadius: 8,
    margin: isSmallDevice ? 12 : 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberText: {
    fontSize: isSmallDevice ? 24 : 32,
    fontWeight: 'bold',
    color: COLORS.secondary500
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 8
  },
  button: {
    flex: 1
  },
  list: {
    flex: 1,
    padding: 16
  }
});
