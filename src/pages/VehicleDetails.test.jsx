import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import VehicleDetails from './VehicleDetails';

function renderVehicleDetails(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/vehicles/:garage/:vehicleId" element={<VehicleDetails />} />
      </Routes>
    </MemoryRouter>
  );
}

test('shows vehicle information and an external reference link', () => {
  renderVehicleDetails('/vehicles/Arcade/1');

  expect(screen.getByRole('heading', { name: 'Raptor' })).toBeInTheDocument();
  expect(screen.getByText('Off-Road')).toBeInTheDocument();
  expect(screen.getByText('Arcade')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View vehicle reference' })).toHaveAttribute(
    'href',
    'https://gta.fandom.com/wiki/Raptor'
  );
});

test('shows a not-found message for an unknown vehicle', () => {
  renderVehicleDetails('/vehicles/Arcade/999');

  expect(screen.getByRole('heading', { name: 'Vehicle not found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Back to vehicles' })).toHaveAttribute('href', '/');
});
