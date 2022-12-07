import { StyleSheet, Text } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import { COLORS } from '../constants/colors';

const InstructionText: FC<PropsWithChildren> = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  text: {
    color: COLORS.secondary500,
    fontSize: 24,
    fontFamily: 'oswald-regular'
  }
});
