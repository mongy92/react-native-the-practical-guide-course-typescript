import { Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Title from '../components/Title';
import { COLORS } from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';

interface Props {
  userNumber: number;
  rounds: number;
  onRestart(): void;
}

const GameOverScreen: FC<Props> = ({ userNumber, rounds, onRestart }) => {
  return (
    <View style={styles.contaier}>
      <Title>Game Over</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/success.png')}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <Text style={styles.summaryText}>
        Your device need <Text style={styles.highlight}>{rounds}</Text> rounds
        to guess the number
        <Text style={styles.highlight}> {userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginVertical: 24
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'oswald-regular',
    marginBottom: 16
  },
  highlight: {
    color: COLORS.primary700
  }
});
