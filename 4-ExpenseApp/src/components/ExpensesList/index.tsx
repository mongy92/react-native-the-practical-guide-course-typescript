import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { FC } from 'react';
import { Expense } from '../../types/Expense';
import { ExpenseItem } from './ExpenseItem';
import { GlobalStyles } from '../../constants/styles';

interface Props {
  data: Expense[];
}

const ExpensesList: FC<Props> = ({ data }) => {
  function renderItem({ item }: ListRenderItemInfo<Expense>) {
    return <ExpenseItem item={item} />;
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>There is no Expenses</Text>
      </View>
    );
  }
  return <FlatList data={data} renderItem={renderItem} />;
};

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
});
