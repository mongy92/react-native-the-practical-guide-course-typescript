import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Expense } from '../../types/Expense';
import { GlobalStyles } from '../../constants/styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GlobalNavigationParams } from '../../navigation/types';
import { formatDateYYYYMMDD } from '../../utils/date';

interface Props {
  item: Expense;
}

export const ExpenseItem: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<NavigationProp<GlobalNavigationParams>>();

  function expensePressHandler() {
    navigation.navigate('ManageExpense', {
      expenseId: item.id
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {item.description}
          </Text>
          <Text style={styles.textBase}>{formatDateYYYYMMDD(item.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4
  },
  textBase: {
    color: GlobalStyles.colors.primary50
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold'
  }
});
