/* eslint-disable no-undef */

/**
 * test scenarios
 *
 * - button component
 *   - check text button
 *   - check type button
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Button from './Button';

import '@testing-library/jest-dom';

describe('Button component', () => {
  it('text button', async () => {
    // Arrange
    render(<Button text="Submit" />);

    // Action
    const button = await screen.getByRole('button');

    // Assert
    expect(button).toHaveTextContent('Submit');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('type button', async () => {
    // Arrange
    render(<Button text="Submit" type="submit" />);

    // Action
    const button = await screen.getByText('Submit');

    // Assert
    expect(button).toHaveAttribute('type', 'submit');
  });
});
