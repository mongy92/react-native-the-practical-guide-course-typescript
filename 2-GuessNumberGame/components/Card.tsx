import { StyleSheet, View } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import { COLORS } from '../constants/colors';

const Card: FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    backgroundColor: COLORS.primary800,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 4,
    elevation: 2,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 4
  }
});
