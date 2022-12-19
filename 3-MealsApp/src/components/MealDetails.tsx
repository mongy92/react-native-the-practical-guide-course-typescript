import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

interface Props {
  duration: number;
  affordability: string;
  complexity: string;
}

export const MealDetails: FC<Props> = ({
  duration,
  affordability,
  complexity
}) => {
  return (
    <View style={styles.details}>
      <Text style={styles.detailsItem}>{duration}m</Text>
      <Text style={styles.detailsItem}>{affordability.toUpperCase()}</Text>
      <Text style={styles.detailsItem}>{complexity.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8
  },
  detailsItem: {
    marginHorizontal: 4,
    fontSize: 12
  }
});
