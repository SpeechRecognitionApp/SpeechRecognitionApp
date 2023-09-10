import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DepositAmount from '../pages/DepositAmount';

describe('DepositAmount Component', () => {
  it('allows the user to click Confirm after entering a number', () => {
    render(
      <MemoryRouter>
        <DepositAmount />
      </MemoryRouter>
    );


    // Query for the input field by its role attribute
    const inputField = screen.getByLabelText(/^Deposit/i)
    const confirmButton = screen.getByText('Confirm');

    // Simulate user input by typing a number into the input field
    fireEvent.change(inputField, { target: { value: '50' } });

    // Verify that the number is in the input field
    expect(inputField).toHaveValue(50);

    // Verify that the Confirm button is enabled
    expect(confirmButton).toBeEnabled();

    // Simulate a click on the Confirm button
    fireEvent.click(confirmButton);
  });
});
