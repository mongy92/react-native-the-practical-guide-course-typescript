import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
interface Props {
  style?: StyleProp<ViewStyle>;
  onPress(): void;
}
const PrimaryButton: FC<PropsWithChildren<Props>> = ({
  children,
  style,
  onPress
}) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        android_ripple={{ color: '#640233' }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    margin: 4,
    overflow: 'hidden',
    borderRadius: 24
  },
  pressable: {
    backgroundColor: '#72063c',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  pressed: {
    opacity: 0.5
  }
});
