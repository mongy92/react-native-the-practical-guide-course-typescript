import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { testIDs } from '../constants/testIDs';

function LoadingOverlay() {
  return (
    <View style={styles.container} testID={testIDs.loading}>
      <ActivityIndicator size='large' color='white' />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  }
});
