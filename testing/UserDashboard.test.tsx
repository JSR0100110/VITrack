import React from 'react';
import { render } from '@testing-library/react';
//import UserDashboard from './UserDashboard';

jest.mock('socket.io-client', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    connected: true,
  })),
}));

test('renders UserDashboard component', () => {
  // render(<UserDashboard />);
});
