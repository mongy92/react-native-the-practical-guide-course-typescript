import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  const [pickedNumber, setPickedNumber] = useState<number>();

  const screen = useMemo(() => {
    return pickedNumber ? (
      <GameScreen />
    ) : (
      <StartGameScreen onPickNumber={setPickedNumber} />
    );
  }, [pickedNumber]);
  return (
    <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.container}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.container}
        imageStyle={styles.image}
      >
        {screen}
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
