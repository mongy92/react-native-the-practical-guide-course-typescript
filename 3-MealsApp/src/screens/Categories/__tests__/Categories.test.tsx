import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';
import { testIDs } from '../../../constants/testIDs';
import CategoriesScreen from '../index';

const Component = (
  <NavigationContainer>
    <CategoriesScreen />
  </NavigationContainer>
);
describe('CategoriesScreen', () => {
  test('should render correctly', async () => {
    const { getByTestId } = render(Component);
    expect(getByTestId(testIDs.categoriesScreen));
  });
});
