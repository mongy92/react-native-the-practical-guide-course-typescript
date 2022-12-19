import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
interface Props {
  data: string[];
  title: string;
}

export const List: FC<Props> = ({ data, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {data.map((item) => (
        <View key={item} style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8
  },
  item: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: 'orange',
    marginBottom: 8,
    borderRadius: 16
  },
  itemText: {
    fontSize: 14
  }
});
