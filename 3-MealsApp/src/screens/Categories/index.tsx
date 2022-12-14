import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootNavigationStackParams } from '../../navigation/types';
import { testIDs } from '../../constants/testIDs';
import { mockedCategories } from '../../mocks/mocked-categories';
import { Category } from '../../types/Category';
import { CategoryItem } from '../../components/CategoryItem';

const CategoriesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationStackParams>>();

  function onPressCategory(category: Category) {
    navigation.navigate('Meals', { categoryId: category.id });
  }

  function renderItem({ item }: ListRenderItemInfo<Category>) {
    return <CategoryItem category={item} onPress={onPressCategory} />;
  }

  return (
    <FlatList
      testID={testIDs.categoriesScreen}
      data={mockedCategories}
      renderItem={renderItem}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
