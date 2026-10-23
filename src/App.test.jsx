import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.replaceState({}, '', '/');
});

test('renders the page title', () => {
  render(<App />);
  expect(screen.getByText('GTA5 Vehicles')).toBeInTheDocument();
});

test('renders nav links for the vehicles and map routes', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'Vehicles' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Apartment Map' })).toBeInTheDocument();
});

test('renders the vehicles table on the default route', () => {
  render(<App />);
  expect(screen.getByRole('columnheader', { name: 'Arcade' })).toBeInTheDocument();
});

test('opens a vehicle detail page from the vehicle list', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: 'Raptor' }));

  expect(screen.getByRole('heading', { name: 'Raptor' })).toBeInTheDocument();
  expect(screen.getByText('Off-Road')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Back to vehicles' })).toHaveAttribute('href', '/');
});

test('renders the personal details form at its existing route', () => {
  window.history.replaceState({}, '', '/details');
  render(<App />);

  expect(screen.getByRole('list', { name: 'Progress' }).children).toHaveLength(3);
  expect(screen.getByText('Step 1').closest('li')).toHaveAttribute('aria-current', 'step');
  expect(screen.getByRole('textbox', { name: 'First name' })).toBeRequired();
  expect(screen.getByRole('textbox', { name: 'Last name' })).toBeRequired();
  expect(screen.getByLabelText('Date of birth')).toHaveAttribute('type', 'date');
  expect(screen.getByLabelText('Date of birth')).toBeRequired();
});
