import { NavigationContainer } from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import { PropsWithChildren, ReactElement } from 'react';

function AllProviders({ children }: PropsWithChildren) {
  return <NavigationContainer>{children}</NavigationContainer>;
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
