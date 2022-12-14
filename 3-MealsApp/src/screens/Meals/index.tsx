import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootNavigationStackParams } from '../../navigation/types';

const MealsScreen = () => {
  const { params } = useRoute<RouteProp<RootNavigationStackParams, 'Meals'>>();

  return (
    <View>
      <Text>MealsScreen {params.categoryId}</Text>
    </View>
  );
};

export default MealsScreen;

const styles = StyleSheet.create({});
