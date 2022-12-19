import {
  NavigationContainer,
  RouteProp,
  useRoute
} from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import MealDetailsScreen from '..';
import { testIDs } from '../../../constants/testIDs';
import { mockedMeals } from '../../../mocks/mocked-meals';
import { RootNavigationStackParams } from '../../../navigation/types';

const Component = (
  <NavigationContainer>
    <MealDetailsScreen />
  </NavigationContainer>
);

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        mealId: 'm1'
      }
    })
  };
});

describe('MealDetails', () => {
  test('should render correctly', () => {
    const { getByTestId } = render(Component);
    getByTestId(testIDs.mealDetailsScreen);
  });

  test('should rener the meals details data (image & title & ingredients & steps)', () => {
    const {
      params: { mealId }
    } = useRoute<RouteProp<RootNavigationStackParams, 'MealDetails'>>();
    const selectedMeal = mockedMeals.find((m) => m.id == mealId)!;
    const { getByText, getByTestId } = render(Component);

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
