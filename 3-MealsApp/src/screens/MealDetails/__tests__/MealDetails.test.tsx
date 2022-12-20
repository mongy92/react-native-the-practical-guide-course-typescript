import { RouteProp, useRoute } from '@react-navigation/native';
import MealDetailsScreen from '..';
import { render } from '../../../../test-utils';
import { testIDs } from '../../../constants/testIDs';
import { mockedMeals } from '../../../mocks/mocked-meals';
import { GlobalNavigationParams } from '../../../navigation/types';

jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: jest.fn()
  };
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      setOptions: jest.fn()
    }),
    useRoute: () => ({
      params: {
        mealId: 'm1'
      }
    })
  };
});

describe('MealDetails', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(<MealDetailsScreen />);
    getByTestId(testIDs.mealDetailsScreen);
  });

  test('should rener the meals details data (image & title & ingredients & steps)', () => {
    const {
      params: { mealId }
    } = useRoute<RouteProp<GlobalNavigationParams, 'MealDetails'>>();
    const selectedMeal = mockedMeals.find((m) => m.id == mealId)!;
    const { getByText, getByTestId } = render(<MealDetailsScreen />);

    getByTestId(testIDs.mealDetailsImage);

    getByText(selectedMeal.title);
    getByText(selectedMeal.affordability.toUpperCase());
    getByText(selectedMeal.complexity.toUpperCase());

    selectedMeal.ingredients.forEach((item) => {
      getByText(item);
    });

    selectedMeal.steps.forEach((item) => {
      getByText(item);
    });
  });
});
