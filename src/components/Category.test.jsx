/* eslint-disable no-undef */

/**
 * test scenarios
 *
 * - category component
 *   - check text button
 *   - check type button
 */

import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Category from './Category';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { setCategory } from '../redux/threads/threadsSlice';

describe('Category component', () => {
  it('text category', async () => {
    // Arrange
    await act(async () =>
      render(
        <Provider store={store}>
          <Category data="react" handleSelect={() => {}} />
        </Provider>
      )
    );

    // Action
    const p = await screen.getByText('#react');

    // Assert
    expect(p).toHaveTextContent('#react');
    expect(p).toHaveClass(
      'px-4 py-0.5 rounded-lg cursor-pointer border border-black'
    );
  });
});
