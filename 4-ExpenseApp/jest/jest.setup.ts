/* eslint-disable no-undef, import/no-extraneous-dependencies */

// Import Jest Native matchers
import '@testing-library/jest-native/extend-expect';
import React from 'react';
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// src/setupTests.js
import { server } from '../src/mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
