import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { testIDs } from '../../constants/testIDs';

const ManageExpense = () => {
  return (
    <View testID={testIDs.manageExpenseScreen}>
      <Text>Ahmed</Text>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({});
