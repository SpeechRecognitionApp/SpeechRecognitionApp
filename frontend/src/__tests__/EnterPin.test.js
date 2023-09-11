import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import EnterPin from '../EnterPin';
import { MemoryRouter, Route } from 'react-router-dom';


jest.mock('axios');

test('renders EnterPin with all elements', () => {
  render(
    <MemoryRouter initialEntries={['/enterpin']}>
      <Route path="/enterpin" component={EnterPin} />
    </MemoryRouter>
  );

  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  expect(screen.getByTestId('pin-input')).toBeInTheDocument();
  expect(screen.getByTestId('keyboard')).toBeInTheDocument();
});

test('updates PIN value when user types', async () => {
  render(<EnterPin />);
  fireEvent.change(screen.getByTestId('pin-input'), { target: { value: '1234' } });

  await waitFor(() => {
    expect(screen.getByTestId('pin-input').value).toBe('1234');
  });
});

test('makes API call when PIN is complete', async () => {
  axios.post.mockResolvedValue({ data: { match: true } });

  render(<EnterPin />);

  fireEvent.change(screen.getByTestId('pin-input'), { target: { value: '1234' } });

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      'http://127.0.0.1:5000/card/verify_pin',
      expect.any(Object),
      expect.any(Object)
    );
  });
});

