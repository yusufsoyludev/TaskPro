import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser } from '../auth/authOperations';
import {
  fetchBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from './boardsOperations';

const initialState={
    items:[],
    activeBoardId:null,
    isLoading:false,
    error:null,
    ownerToken:null,
};

const resetBoardsState = state => {
  state.items = [];
  state.activeBoardId = null;
  state.isLoading = false;
  state.error = null;
};

const isCurrentOwner = (state, ownerToken) => state.ownerToken === ownerToken;

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setActiveBoardId(state, action) {
      state.activeBoardId = action.payload;
    },
    clearBoards(state) {
      resetBoardsState(state);
      state.ownerToken = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        resetBoardsState(state);
        state.ownerToken = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        resetBoardsState(state);
        state.ownerToken = action.payload.accessToken || null;
        state.isLoading = true;
      })
      .addCase(login.rejected, state => {
        resetBoardsState(state);
        state.ownerToken = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        resetBoardsState(state);
        state.ownerToken = action.payload.token || null;
      })
      .addCase(refreshUser.rejected, state => {
        resetBoardsState(state);
        state.ownerToken = null;
      })
      .addCase(logout.fulfilled, state => {
        resetBoardsState(state);
        state.ownerToken = null;
      })

      .addCase(fetchBoards.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.isLoading = false;
        state.items = action.payload.items;

        if (!state.activeBoardId && action.payload.items.length > 0) {
          state.activeBoardId = action.payload.items[0].id;
        }
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        if (!isCurrentOwner(state, action.payload?.ownerToken)) {
          return;
        }

        state.isLoading = false;
        state.error = action.payload?.message || action.payload;
      })

      .addCase(createBoard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.items.push(action.payload.board);
        state.activeBoardId = action.payload.board.id;
      })

      .addCase(updateBoard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        const index = state.items.findIndex(
          board => board.id === action.payload.board.id,
        );

        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload.board,
          };
        }
      })

      .addCase(deleteBoard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.items = state.items.filter(
          board => board.id !== action.payload.boardId,
        );

        if (state.activeBoardId === action.payload.boardId) {
          state.activeBoardId = state.items[0]?.id || null;
        }
      });
  },
});

export const { setActiveBoardId, clearBoards } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
