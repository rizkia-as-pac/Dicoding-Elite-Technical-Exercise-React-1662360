import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/auth';

export const register = createAsyncThunk(
  'auth/register',
  async (payload, thunkAPI) => {
    try {
      let success = false;
      let message = '';
      await AuthService.register(payload)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'success') {
            success = true;
          } else {
            message = res.message;
          }
        });
      return { success: success, message: message };
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

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    try {
      let isLogin = false;

      await AuthService.login(payload)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'success') {
            localStorage.setItem('dicoding', JSON.stringify(res.data.token));
            thunkAPI.dispatch(getUser(res.data.token));

            isLogin = true;
          } else {
            thunkAPI.dispatch(setError(res.message));
          }
        });

      return { isLogin: isLogin };
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

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (payload, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem('dicoding'));
      const res = await AuthService.getUser(token);
      const data = await res.json();
      return { user: (data.data && data.data.user) || null };
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
  isLoggedIn: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('dicoding');
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.user ? true : false;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { logout, setError } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;
