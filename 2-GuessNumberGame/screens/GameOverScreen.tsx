import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';
import React, { FC, useMemo } from 'react';
import Title from '../components/Title';
import { COLORS } from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';

interface Props {
  userNumber: number;
  rounds: number;
  onRestart(): void;
}

const GameOverScreen: FC<Props> = ({ userNumber, rounds, onRestart }) => {
  const { height } = useWindowDimensions();
  const imageStyle = useMemo(() => {
    return {
      width: height < 450 ? 100 : 200,
      height: height < 450 ? 100 : 200,
      borderRadius: height < 450 ? 50 : 100
    };
  }, [height]);
  return (
    <View style={styles.contaier}>
      <Title>Game Over</Title>
      <View style={[styles.imageContainer, imageStyle]}>
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
