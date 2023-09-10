import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import KioskDashboard from '../components/DashboardItems';

describe('KioskDashboard Component', () => {
  it('displays all buttons', () => {
    render(
      // Wrap your component with MemoryRouter to provide the Router context
      <MemoryRouter>
        <KioskDashboard />
      </MemoryRouter>
    );

    // Check if all buttons are displayed
    const depositButton = screen.getByText('Deposit');
    const withdrawButton = screen.getByText('Withdraw');
    const transferButton = screen.getByText('Transfer');
    const historyButton = screen.getByText('Transaction History');
    const assistantButton = screen.getByText('AI Assistant');
    const accountButton = screen.getByText('Account Management');

    expect(depositButton).toBeInTheDocument();
    expect(withdrawButton).toBeInTheDocument();
    expect(transferButton).toBeInTheDocument();
    expect(historyButton).toBeInTheDocument();
    expect(assistantButton).toBeInTheDocument();
    expect(accountButton).toBeInTheDocument();
  });
});
