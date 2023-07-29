/* eslint-disable no-undef */
/**
 * test scenarios
 *
 * - thread reducer
 *   - should return initalState when given uknown action type
 *   - should return the selectedCategory when given by setCategory action
 *   - should return the categories when given by setCategories action
 *   - should return the filtered dat when given category
 *
 * - thunk
 *   - should call url getThreads
 *   - should call url getDetailThreads
 *   - should call url getUSers
 *   - should call url getLeaderboards
 */

import { configureStore } from '@reduxjs/toolkit';
import threadReducer, {
  setCategory,
  setCategories,
  filterThreads,
  getThreads,
  getDetailThread,
  getUsers,
  getLeaderboards,
} from './threadsSlice';

const baseURL = 'https://forum-api.dicoding.dev/v1';

describe('threads reducer', () => {
  const state = {
    isLoading: false,
    threads: [],
    detailThread: null,
    filteredThreads: [],
    users: [],
    leaderboards: [],
    categories: [],
    selectedCategory: '',
  };

  it('should handle initial state', () => {
    // arrange
    const initialState = state;

    // action
    const action = { type: 'unknown' };

    // assert
    const expectedState = initialState;
    expect(threadReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setCategory', () => {
    // arrange
    const initialState = { ...state, selectedCategory: '' };

    // action
    const action = setCategory('react');

    // assert
    const expectedState = { ...state, selectedCategory: 'react' };
    expect(threadReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setCategories', () => {
    // arrange
    const initialState = { ...state, categories: [] };

    // action
    const action = setCategories(['react', 'introduction']);

    // assert
    const expectedState = { ...state, categories: ['react', 'introduction'] };
    expect(threadReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle filterThreads', () => {
    // arrange
    const initialState = {
      ...state,
      filteredThreads: [],
      threads: [
        {
          id: 'thread-08_nUU2fhu1P5nre',
          title: 'Pengalaman Belajar React di Dicoding',
          body: 'Menurut teman-teman, bagaimana pengalaman belajar kelas React di Dicoding? Apakah mudah ataukah sulit? Yuk, ceritakan di sini.',
          category: 'react',
          createdAt: '2022-11-13T09:59:31.019Z',
          ownerId: 'user-5PqX6Ldhnk_ifroq',
          totalComments: 1,
          upVotesBy: ['user-6oWew2w2Wx5xLUTU', 'user-5PqX6Ldhnk_ifroq'],
          downVotesBy: [],
        },
        {
          id: 'thread-B3N9KGa87vfMHyBQ',
          title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu!',
          body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>1. Siapa kamu dan dari mana kamu berasal?</div><div>2. Apa pekerjaan atau pendidikan kamu saat ini?</div><div>3. Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
          category: 'introduction',
          createdAt: '2022-11-13T09:55:55.353Z',
          ownerId: 'user-6oWew2w2Wx5xLUTU',
          totalComments: 1,
          upVotesBy: ['user-5PqX6Ldhnk_ifroq', 'user-6oWew2w2Wx5xLUTU'],
          downVotesBy: [],
        },
      ],
      selectedCategory: 'react',
    };

    // action
    const action = filterThreads();

    // assert
    const expectedState = {
      ...state,
      filteredThreads: [
        {
          id: 'thread-08_nUU2fhu1P5nre',
          title: 'Pengalaman Belajar React di Dicoding',
          body: 'Menurut teman-teman, bagaimana pengalaman belajar kelas React di Dicoding? Apakah mudah ataukah sulit? Yuk, ceritakan di sini.',
          category: 'react',
          createdAt: '2022-11-13T09:59:31.019Z',
          ownerId: 'user-5PqX6Ldhnk_ifroq',
          totalComments: 1,
          upVotesBy: ['user-6oWew2w2Wx5xLUTU', 'user-5PqX6Ldhnk_ifroq'],
          downVotesBy: [],
        },
      ],
      threads: [
        {
          id: 'thread-08_nUU2fhu1P5nre',
          title: 'Pengalaman Belajar React di Dicoding',
          body: 'Menurut teman-teman, bagaimana pengalaman belajar kelas React di Dicoding? Apakah mudah ataukah sulit? Yuk, ceritakan di sini.',
          category: 'react',
          createdAt: '2022-11-13T09:59:31.019Z',
          ownerId: 'user-5PqX6Ldhnk_ifroq',
          totalComments: 1,
          upVotesBy: ['user-6oWew2w2Wx5xLUTU', 'user-5PqX6Ldhnk_ifroq'],
          downVotesBy: [],
        },
        {
          id: 'thread-B3N9KGa87vfMHyBQ',
          title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu!',
          body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>1. Siapa kamu dan dari mana kamu berasal?</div><div>2. Apa pekerjaan atau pendidikan kamu saat ini?</div><div>3. Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
          category: 'introduction',
          createdAt: '2022-11-13T09:55:55.353Z',
          ownerId: 'user-6oWew2w2Wx5xLUTU',
          totalComments: 1,
          upVotesBy: ['user-5PqX6Ldhnk_ifroq', 'user-6oWew2w2Wx5xLUTU'],
          downVotesBy: [],
        },
      ],
      selectedCategory: 'react',
    };
    expect(threadReducer(initialState, action)).toEqual(expectedState);
  });
});

describe('thunk', () => {
  // arrange
  const store = configureStore({
    reducer: function () {},
  });

  it('getThreads', async () => {
    // arrange
    const postSpy = jest.spyOn(global, 'fetch');

    // action
    await store.dispatch(getThreads());

    // assert
    expect(postSpy).toBeCalledWith(`${baseURL}/threads`);
  });

  it('getDetailThreads', async () => {
    // arrange
    const postSpy = jest.spyOn(global, 'fetch');

    // action
    await store.dispatch(getDetailThread('thread-B3N9KGa87vfMHyBQ'));

    // assert
    expect(postSpy).toBeCalledWith(
      `${baseURL}/threads/thread-B3N9KGa87vfMHyBQ`
    );
  });

  it('getUsers', async () => {
    // arrange
    const postSpy = jest.spyOn(global, 'fetch');

    // action
    await store.dispatch(getUsers());

    // assert
    expect(postSpy).toBeCalledWith(`${baseURL}/users`);
  });

  it('getLeaderboards', async () => {
    // arrange
    const postSpy = jest.spyOn(global, 'fetch');

    // action
    await store.dispatch(getLeaderboards());

    // assert
    expect(postSpy).toBeCalledWith(`${baseURL}/leaderboards`);
  });
});
