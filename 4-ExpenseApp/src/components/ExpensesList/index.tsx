import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { Expense } from '../../types/Expense';
import { ExpenseItem } from './ExpenseItem';

interface Props {
  data: Expense[];
}

const ExpensesList: FC<Props> = ({ data }) => {
  function renderItem({ item }: ListRenderItemInfo<Expense>) {
    return <ExpenseItem item={item} />;
  }

  return <FlatList data={data} renderItem={renderItem} />;
};

export default ExpensesList;
