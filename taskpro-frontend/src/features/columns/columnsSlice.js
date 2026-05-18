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
  byBoardId: {},
  loadedBoardIds: {},
  loadingBoardIds: {},
  isLoading: false,
  error: null,
  ownerToken: null,
};

const resetColumnsState = state => {
  state.items = [];
  state.byBoardId = {};
  state.loadedBoardIds = {};
  state.loadingBoardIds = {};
  state.isLoading = false;
  state.error = null;
};

const syncVisibleItems = (state, boardId) => {
  if (!boardId) return;

  const nextItems = state.byBoardId[boardId] || [];

  if (
    state.items.length === 0 ||
    state.items.some(column => column.boardId === boardId)
  ) {
    state.items = nextItems;
  }
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
.addCase(fetchColumns.pending, (state, action) => {
  state.isLoading = true;
  state.error = null;
  state.loadingBoardIds[action.meta.arg] = true;
})
.addCase(fetchColumns.fulfilled, (state, action) => {
  if (!isCurrentOwner(state, action.payload.ownerToken)) {
    return;
  }

  state.isLoading = false;
  state.items = action.payload.items;
  state.byBoardId[action.payload.boardId] = action.payload.items;
  state.loadedBoardIds[action.payload.boardId] = true;
  delete state.loadingBoardIds[action.payload.boardId];
})
.addCase(fetchColumns.rejected, (state, action) => {
  if (!isCurrentOwner(state, action.payload?.ownerToken)) {
    return;
  }

  state.isLoading = false;
  state.error = action.payload?.message || action.payload;
  delete state.loadingBoardIds[action.meta.arg];
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
        const { boardId } = action.payload.column;
        const boardColumns = state.byBoardId[boardId] || [];

        state.byBoardId[boardId] = [...boardColumns, action.payload.column];
        state.loadedBoardIds[boardId] = true;
        syncVisibleItems(state, boardId);
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
        const { boardId, id } = action.payload.column;
        const boardColumns = state.byBoardId[boardId] || [];

        state.byBoardId[boardId] = boardColumns.map(column =>
          column.id === id ? action.payload.column : column,
        );
        syncVisibleItems(state, boardId);
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.isLoading = false;
        if (action.payload.boardId) {
          state.byBoardId[action.payload.boardId] = (
            state.byBoardId[action.payload.boardId] || []
          ).filter(column => column.id !== action.payload.columnId);
          syncVisibleItems(state, action.payload.boardId);
        }
      });
  },
});
export const { clearColumns } = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
