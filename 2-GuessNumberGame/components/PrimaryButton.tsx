import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import { COLORS } from '../constants/colors';
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
        android_ripple={{ color: COLORS.primary600 }}
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
    backgroundColor: COLORS.primary500,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  pressed: {
    opacity: 0.5
  }
});
