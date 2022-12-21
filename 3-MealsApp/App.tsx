import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from './src/navigation/RootNavigation';
import 'react-native-gesture-handler';
import FavoritesProvider from './src/stores/Favorites';

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
