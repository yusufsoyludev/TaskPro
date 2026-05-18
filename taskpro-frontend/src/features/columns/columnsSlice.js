import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser } from '../auth/authOperations';
import {
  fetchColumns,
  createColumn,
  updateColumn,
  deleteColumn,
} from './columnsOperations';

const initialState = {
    items:[],
  isLoading: false,
  error: null,
  ownerToken: null,
};

const resetColumnsState = state => {
  state.items = [];
  state.isLoading = false;
  state.error = null;
};

const isCurrentOwner = (state, ownerToken) => state.ownerToken === ownerToken;

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    clearColumns(state) {
      resetColumnsState(state);
      state.ownerToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, state => {
  resetColumnsState(state);
  state.ownerToken = null;
})
.addCase(login.fulfilled, (state, action) => {
  resetColumnsState(state);
  state.ownerToken = action.payload.accessToken || null;
})
.addCase(login.rejected, state => {
  resetColumnsState(state);
  state.ownerToken = null;
})
.addCase(refreshUser.fulfilled, (state, action) => {
  resetColumnsState(state);
  state.ownerToken = action.payload.token || null;
})
.addCase(refreshUser.rejected, state => {
  resetColumnsState(state);
  state.ownerToken = null;
})
.addCase(logout.fulfilled, state => {
  resetColumnsState(state);
  state.ownerToken = null;
})
    .addCase(fetchColumns.pending, state => {
  state.isLoading = true;
  state.error = null;
})
.addCase(fetchColumns.fulfilled, (state, action) => {
  if (!isCurrentOwner(state, action.payload.ownerToken)) {
    return;
  }

  state.isLoading = false;
  state.items = action.payload.items;
})
.addCase(fetchColumns.rejected, (state, action) => {
  if (!isCurrentOwner(state, action.payload?.ownerToken)) {
    return;
  }

  state.isLoading = false;
  state.error = action.payload?.message || action.payload;
})
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.isLoading = false;
      })
      .addCase(createColumn.rejected, (state, action) => {
        if (!isCurrentOwner(state, action.payload?.ownerToken)) {
          return;
        }

        state.isLoading = false;
        state.error = action.payload?.message || action.payload;
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.isLoading = false;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.isLoading = false;
      });
  },
});
export const { clearColumns } = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
