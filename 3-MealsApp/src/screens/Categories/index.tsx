import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootNavigationStackParams } from '../../navigation/types';

const CategoriesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationStackParams>>();
  return (
    <View>
      <Text onPress={() => navigation.navigate('Meals', { categoryId: 12 })}>
        CategoriesScreen
      </Text>
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
