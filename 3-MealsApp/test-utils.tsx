import { NavigationContainer } from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import FavoritesProvider from './src/stores/Favorites';

function AllProviders({ children }: PropsWithChildren) {
  return (
    <FavoritesProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </FavoritesProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: AllProviders,
    ...options
  });

export * from '@testing-library/react-native';

export { customRender as render };
