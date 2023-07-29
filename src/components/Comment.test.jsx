/* eslint-disable no-undef */

/**
 * test scenarios
 *
 * - category component
 *   - check text button
 *   - check type button
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from './Comment';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Comment component', () => {
  it('text comment', async () => {
    // Arrange
    const data = {
      id: 'comment-fJ579RDuAsZdB4ER',
      content:
        'Halo! Saya Dimas, dari Bandung.<br><br>Saat ini, saya sedang belajar React di Dicoding Academy.',
      createdAt: '2022-11-13T09:57:52.762Z',
      owner: {
        id: 'user-5PqX6Ldhnk_ifroq',
        name: 'Dimas Saputra',
        avatar:
          'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      upVotesBy: ['user-6oWew2w2Wx5xLUTU'],
      downVotesBy: [],
    };

    render(
      <Provider store={store}>
        <Comment
          data={data}
          handleDownComment={() => {}}
          handleNeutralComment={() => {}}
          handleUpComment={() => {}}
        />
      </Provider>
    );

    // Action
    const ownerName = await screen.getByText('Dimas Saputra');
    const img = await screen.getByRole('img');

    // Assert
    expect(ownerName).toHaveTextContent('Dimas Saputra');
    expect(img).toHaveAttribute(
      'src',
      'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
    );
  });
});
