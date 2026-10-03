import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/navigation/AppNavigator', () => ({
  AppNavigator: () => null,
  linking: { prefixes: [] }
}));

test('app mounts and hydrates auth without crashing', async () => {
  await render(<App />);
});
