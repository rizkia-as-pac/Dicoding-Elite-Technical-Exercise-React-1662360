/* eslint-disable no-undef */

/**
 * test scenarios
 *
 * - auth function
 *   - should return initalState when given uknown action type
 *   - should return isLogginIn false when logout
 *
 * - thunk
 *   - should call url login
 *   - should call url register
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout, register } from './authSlice';

const baseURL = 'https://forum-api.dicoding.dev/v1';

describe('auth reducer', () => {
  const state = {
    isLoggedIn: false,
    user: null,
  };

  it('should handle initial state', () => {
    // arrange
    const initialState = state;

    // action
    const action = { type: 'unknown' };

    // assert
    const expectedState = initialState;
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle logout', () => {
    // arrange
    const initialState = { ...state, isLoggedIn: true };

    // action
    const action = logout();

    // assert
    const expectedState = { ...state, isLoggedIn: false };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
});

describe('auth thunk', () => {
  // arrange
  const store = configureStore({
    reducer: function () {},
  });

  it('login', async () => {
    // arrange
    const data = { email: 'test@gmail.com', password: '123456' };
    const postSpy = jest.spyOn(global, 'fetch');

    // action
    await store.dispatch(login(data));

    // assert
    expect(postSpy).toBeCalledWith(`${baseURL}/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
  });

  it('register', async () => {
    // arrange
    const data = { name: 'test', email: 'test@gmail.com', password: '123456' };
    const postSpy = jest.spyOn(global, 'fetch');

    // action
    await store.dispatch(register(data));

    // assert
    expect(postSpy).toBeCalledWith(`${baseURL}/register`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
  });
});
