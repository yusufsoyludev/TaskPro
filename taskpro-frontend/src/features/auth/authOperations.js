import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthHeader, clearAuthHeader } from '../../services/api';

const normalizeAuthData = data => {
  const payload = data.data || data;

  return {
    user: payload.user || payload,
    accessToken:
      payload.accessToken ||
      payload.token ||
      data.accessToken ||
      data.token,
  };
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/register', credentials);
      const authData = normalizeAuthData(data);

      if (authData.accessToken) {
        setAuthHeader(authData.accessToken);
      }

      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      const authData = normalizeAuthData(data);

      if (authData.accessToken) {
        setAuthHeader(authData.accessToken);
      }

      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token');
    }

    try {
      setAuthHeader(token);
      const { data } = await api.get('/auth/current');
      return data.data || data;
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});