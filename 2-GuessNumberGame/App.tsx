import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.container}>
      <StatusBar style='auto' />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
