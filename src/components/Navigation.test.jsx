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
import Navigation from './Navigation';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Navigation component', () => {
  it('display correctly', async () => {
    // Arrange
    const el = render(
      <Provider store={store}>
        <Router>
          <Navigation />
        </Router>
      </Provider>
    );

    // Action
    const navigation = el.container.querySelector('#navigation');

    // Assert
    expect(navigation.childElementCount).toEqual(3);
  });
});
