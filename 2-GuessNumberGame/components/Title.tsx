import { StyleSheet, Text, View } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import { COLORS } from '../constants/colors';

const Title: FC<PropsWithChildren> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.white
  }
});
