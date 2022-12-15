import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import { testIDs } from '../../../constants/testIDs';
import { mockedCategories } from '../../../mocks/mocked-categories';
import CategoriesScreen from '../index';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate
    })
  };
});

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

  test('should render list of categories', () => {
    const { getByText } = render(Component);
    mockedCategories.forEach((c) => {
      getByText(c.title);
    });
  });

  test('should navigate to Meals screen on press category ', () => {
    const navigation = useNavigation();
    const { getByText } = render(Component);
    const categoryItem = getByText(mockedCategories[0].title);

    fireEvent.press(categoryItem);

    expect(navigation.navigate).toHaveBeenCalledWith('Meals', {
      categoryId: mockedCategories[0].id,
      title: mockedCategories[0].title
    });
  });
});
