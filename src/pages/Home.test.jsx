import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

test('renders a garage column header for each garage', () => {
  renderHome();
  expect(screen.getByRole('columnheader', { name: 'Arcade' })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: 'Casino' })).toBeInTheDocument();
});

test('links each vehicle to its internal detail page', () => {
  renderHome();
  expect(screen.getByRole('link', { name: 'Raptor' })).toHaveAttribute('href', '/vehicles/Arcade/1');
});

test('search filters vehicles by a case-insensitive partial name match', () => {
  renderHome();
  fireEvent.change(screen.getByRole('searchbox', { name: 'Search cars' }), {
    target: { value: 'rAPtOr' },
  });

  expect(screen.getByRole('link', { name: 'Raptor' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Paragon R' })).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('1 vehicle found');
});

test('shows an empty state when search and filters have no matches', () => {
  renderHome();
  fireEvent.change(screen.getByRole('searchbox', { name: 'Search cars' }), {
    target: { value: 'not a vehicle' },
  });

  expect(screen.getByText(/No vehicles found/)).toBeInTheDocument();
  expect(screen.queryByRole('table')).not.toBeInTheDocument();
});

test('filters by category and garage', () => {
  renderHome();
  fireEvent.change(screen.getByRole('combobox', { name: 'Category' }), {
    target: { value: 'Off-Road' },
  });
  fireEvent.change(screen.getByRole('combobox', { name: 'Garage' }), {
    target: { value: 'Arcade' },
  });

  expect(screen.getByRole('columnheader', { name: 'Arcade' })).toBeInTheDocument();
  expect(screen.queryByRole('columnheader', { name: 'Casino' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Raptor' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Vigilante' })).not.toBeInTheDocument();
});

test('sorts vehicles alphabetically within each garage', () => {
  renderHome();
  fireEvent.change(screen.getByRole('combobox', { name: 'Garage' }), {
    target: { value: 'Arcade' },
  });
  fireEvent.change(screen.getByRole('combobox', { name: 'Sort by' }), {
    target: { value: 'name-asc' },
  });

  const vehicleCells = within(screen.getByRole('table')).getAllByRole('link');
  expect(vehicleCells[0]).toHaveTextContent('Blazer');
});
