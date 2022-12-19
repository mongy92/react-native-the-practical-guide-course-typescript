import { useNavigation } from '@react-navigation/native';
import { fireEvent } from '@testing-library/react-native';
import MealsScreen from '..';
import { render } from '../../../../test-utils';
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

describe('MealsScreen', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(<MealsScreen />);
    getByTestId(testIDs.mealsScreen);
  });

  test('should render list of meals', () => {
    const { getByText, getAllByText } = render(<MealsScreen />);

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
    const { getByText } = render(<MealsScreen />);
    const navigation = useNavigation();

    const mealItem = getByText(mockedMeals[0].title);
    fireEvent.press(mealItem);

    expect(navigation.navigate).toBeCalledWith('MealDetails', {
      mealId: mockedMeals[0].id
    });
  });
});
