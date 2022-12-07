import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import { useFonts } from 'expo-font';

export default function App() {
  const [pickedNumber, setPickedNumber] = useState<number>();
  const [gameOver, setGameOver] = useState(false);
  const [rounds, setRounds] = useState(0);
  const [fontsLoaded] = useFonts({
    'oswald-regular': require('./assets/fonts/Oswald-Regular.ttf'),
    'oswald-bold': require('./assets/fonts/Oswald-Bold.ttf')
  });

  function onPickNumber(number: number) {
    setPickedNumber(number);
    setGameOver(false);
  }

  function onGameOver() {
    setGameOver(true);
  }

  function onRestart() {
    setGameOver(false);
    setRounds(0);
    setPickedNumber(undefined);
  }

  const screen = useMemo(() => {
    if (gameOver && pickedNumber) {
      return (
        <GameOverScreen
          userNumber={pickedNumber}
          rounds={rounds}
          onRestart={onRestart}
        />
      );
    }
    if (pickedNumber) {
      return <GameScreen userNumber={pickedNumber} onGameOver={onGameOver} />;
    }
    return <StartGameScreen onPickNumber={onPickNumber} />;
  }, [pickedNumber, gameOver]);

  if (!fontsLoaded) {
    return null;
  }
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
