import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccountManagePage from '../pages/AccountManagement';
import { waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios'); // Mock Axios to simulate API calls

describe('AccountManagement Component', () => {
  it('displays "John" in the First Name field', async () => {
    // Mock Axios response with user data
    axios.get.mockResolvedValueOnce({
      data: {
        first_name: 'John',
        second_name: 'Doe',
        email: 'john.doe@example.com',
        house_name: '123 Main St',
        street_line: 'Apt 4B',
        postcode: '12345',
      },
    });

    render(
      <MemoryRouter>
        <AccountManagePage />
      </MemoryRouter>
    );

    // Wait for the component to load and display user data
    await waitFor(() => {
        const firstNameField = screen.getByLabelText('First Name');
        const lastNameField = screen.getByLabelText('Last Name');
        const emailField = screen.getByLabelText('Email Address');
        const houseNameField = screen.getByLabelText('House Name');
        const streetLineField = screen.getByLabelText('Street Line');
        const postcodeField = screen.getByLabelText('Post code');
  
        // Check if the fields have the expected values
        expect(firstNameField).toHaveValue('John');
        expect(lastNameField).toHaveValue('Doe');
        expect(emailField).toHaveValue('john.doe@example.com');
        expect(houseNameField).toHaveValue('123 Main St');
        expect(streetLineField).toHaveValue('Apt 4B');
        expect(postcodeField).toHaveValue('12345');
      });
    });
  });
