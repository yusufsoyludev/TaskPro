import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthHeader, clearAuthHeader } from '../../services/api';

const normalizeAuthError = error => {
  const responseData = error.response?.data;
  const rawData = responseData?.data;
  const rawFields = Array.isArray(rawData)
    ? rawData.reduce((acc, item) => {
        const fieldName = item.path?.[0];

        if (fieldName && !acc[fieldName]) {
          acc[fieldName] = item.message;
        }

        return acc;
      }, {})
    : rawData?.fields || {};

  return {
    message:
      responseData?.message ||
      Object.values(rawFields)[0] ||
      error.message ||
      'Something went wrong.',
    fields: rawFields,
  };
};

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
      clearAuthHeader();
      return data.data || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(normalizeAuthError(error));
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
      return thunkAPI.rejectWithValue(normalizeAuthError(error));
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
      return {
        user: data.data || data,
        token,
      };
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();

      return Boolean(state.auth.token) && !state.auth.isRefreshing && !state.auth.user;
    },
  },
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ name, avatarUrl }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (token) {
      setAuthHeader(token);
    }

    try {
      const { data } = await api.patch('/auth/profile', {
        name,
        avatarUrl,
      });

      return data.data?.user || data.user || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(normalizeAuthError(error));
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
