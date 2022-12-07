import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '../constants/colors';

interface Props {
  roundNumber: number;
  guessNmuber: number;
}

const GuessLogItem: FC<Props> = ({ roundNumber, guessNmuber }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}># {roundNumber}</Text>
      <Text style={styles.text}>Opponent guess {guessNmuber}</Text>
    </View>
  );
};

export default GuessLogItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.secondary500,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary800,
    width: '100%'
  },
  text: {
    fontFamily: 'oswald-regular',
    color: COLORS.primary800
  }
});
