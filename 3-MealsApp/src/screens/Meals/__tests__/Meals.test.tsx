import {
  NavigationContainer,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import MealsScreen from '..';
import { testIDs } from '../../../constants/testIDs';
import { mockedMeals } from '../../../mocks/mocked-meals';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      setOptions: jest.fn()
    }),
    useRoute: () => ({
      params: {
        categoryId: 'c1'
      }
    })
  };
});

const Component = (
  <NavigationContainer>
    <MealsScreen />
  </NavigationContainer>
);

describe('MealsScreen', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(Component);
    getByTestId(testIDs.mealsScreen);
  });

  test('should render list of meals', () => {
    const { getByText, getAllByText } = render(Component);

    const displayedMeals = mockedMeals.filter(
      (meal) => meal.categoryIds.indexOf('c1') >= 0
    );

    displayedMeals.forEach((mealItem) => {
      getAllByText(mealItem.complexity.toUpperCase());
      getAllByText(mealItem.affordability.toUpperCase());
      getByText(mealItem.title);
    });
  });

  test('should navigate to MealDetails', () => {
    const { getByText } = render(Component);
    const navigation = useNavigation();

    const mealItem = getByText(mockedMeals[0].title);
    fireEvent.press(mealItem);

    expect(navigation.navigate).toBeCalledWith('MealDetails', {
      mealId: mockedMeals[0].id
    });
  });
});
