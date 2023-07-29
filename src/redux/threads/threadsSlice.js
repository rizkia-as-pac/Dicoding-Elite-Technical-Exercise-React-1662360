import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import ThreadsService from '../../services/threads';

export const getThreads = createAsyncThunk(
  'threads/getThreads',
  async (payload, thunkAPI) => {
    try {
      const res = await ThreadsService.getThreads();
      const data = await res.json();
      return { threads: data.data.threads };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDetailThread = createAsyncThunk(
  'threads/getDetailThread',
  async (payload, thunkAPI) => {
    try {
      const res = await ThreadsService.getDetailThread(payload);
      const data = await res.json();
      return { detailThread: data.data.detailThread };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUsers = createAsyncThunk(
  'threads/getUsers',
  async (payload, thunkAPI) => {
    try {
      const res = await ThreadsService.getUsers();
      const data = await res.json();
      return { users: data.data.users };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLeaderboards = createAsyncThunk(
  'threads/getLeaderboards',
  async (payload, thunkAPI) => {
    try {
      const res = await ThreadsService.getLeaderboards();
      const data = await res.json();
      return { leaderboards: data.data.leaderboards };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleUpVotes = createAsyncThunk(
  'threads/handleUpVotes',
  async (payload, thunkAPI) => {
    try {
      await ThreadsService.handleUpVotes(payload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleNeutralVotes = createAsyncThunk(
  'threads/handleNeutralVotes',
  async (payload, thunkAPI) => {
    try {
      await ThreadsService.handleNeutralVotes(payload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleDownVotes = createAsyncThunk(
  'threads/handleDownVotes',
  async (payload, thunkAPI) => {
    try {
      await ThreadsService.handleDownVotes(payload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createThread = createAsyncThunk(
  'threads/createThread',
  async (payload, thunkAPI) => {
    try {
      await ThreadsService.createThread(payload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createComment = createAsyncThunk(
  'threads/createThread',
  async (payload, thunkAPI) => {
    try {
      await ThreadsService.createComment(payload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleUpComment = createAsyncThunk(
  'threads/handleUpComment',
  async (payload, thunkAPI) => {
    try {
      await ThreadsService.handleUpComment(payload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleNeutralComment = createAsyncThunk(
  'threads/handleNeutralComment',
  async (payload, thunkAPI) => {
    try {
      await ThreadsService.handleNeutralComment(payload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleDownComment = createAsyncThunk(
  'threads/handleDownComment',
  async (payload, thunkAPI) => {
    try {
      await ThreadsService.handleDownComment(payload);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const initialState = {
  isLoading: false,
  threads: [],
  detailThread: null,
  filteredThreads: [],
  users: [],
  leaderboards: [],
  categories: [],
  selectedCategory: '',
};

export const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    filterThreads: (state) => {
      if (state.selectedCategory !== '')
        state.filteredThreads = state.threads.filter(
          (thread) => thread.category === state.selectedCategory
        );
      else state.filteredThreads = state.threads;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.threads = action.payload.threads;
        state.filteredThreads = action.payload.threads;
      })
      .addCase(getThreads.rejected, (state) => {
        state.threads = [];
        state.filteredThreads = [];
      })
      .addCase(getDetailThread.fulfilled, (state, action) => {
        state.detailThread = action.payload.detailThread;
      })
      .addCase(getDetailThread.rejected, (state) => {
        state.detailThread = {};
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state) => {
        state.users = [];
      })
      .addCase(getLeaderboards.fulfilled, (state, action) => {
        state.leaderboards = action.payload.leaderboards;
      })
      .addCase(getLeaderboards.rejected, (state) => {
        state.leaderboards = [];
      })
      .addMatcher(
        isPending(getThreads, getDetailThread, getUsers, getLeaderboards),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isFulfilled(getThreads, getDetailThread, getUsers, getLeaderboards),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isRejected(getThreads, getDetailThread, getUsers, getLeaderboards),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

// Action creators are generated for each case reducer function
export const { filterThreads, setCategory, setCategories } =
  threadsSlice.actions;

const reducer = threadsSlice.reducer;
export default reducer;
