import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  const [pickedNumber, setPickedNumber] = useState<number>();
  const [gameOver, setGameOver] = useState(false);

  function onPickNumber(number: number) {
    setPickedNumber(number);
    setGameOver(false);
  }

  function onGameOver() {
    setGameOver(true);
  }

  const screen = useMemo(() => {
    if (gameOver) {
      return <GameOverScreen />;
    }
    if (pickedNumber) {
      return <GameScreen userNumber={pickedNumber} onGameOver={onGameOver} />;
    }
    return <StartGameScreen onPickNumber={onPickNumber} />;
  }, [pickedNumber, gameOver]);
  return (
    <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.container}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.container}
        imageStyle={styles.image}
      >
        <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    opacity: 0.15
  }
});
