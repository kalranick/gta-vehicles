import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from './Map';

test('renders the map image', () => {
  render(<Map />);
  expect(screen.getByAltText('Map')).toBeInTheDocument();
});

test('renders a tooltip label for icon 1', () => {
  const { container } = render(<Map />);
  const label = container.querySelector('.map-icon-label');
  expect(label).toHaveAttribute('data-tooltip', '3 Alta St. Tower, Apt 10');
});
