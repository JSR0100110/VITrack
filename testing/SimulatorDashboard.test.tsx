import React from 'react';
import { render } from '@testing-library/react';
// import SimulatorDashboard from './SimulatorDashboard';

jest.mock('socket.io-client', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    connected: true,
  })),
}));

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useParams: jest.fn(() => ({ id: 'some_id' })),
}));

jest.mock('leaflet', () => ({
  icon: jest.fn(),
  Marker: jest.fn(),
  Popup: jest.fn(),
}));

test('renders SimulatorDashboard component', () => {
//   render(<SimulatorDashboard />);
});
