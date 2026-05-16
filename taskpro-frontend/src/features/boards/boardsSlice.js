import { createSlice } from '@reduxjs/toolkit';
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
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setActiveBoardId(state, action) {
      state.activeBoardId = action.payload;
    },
    clearBoards(state) {
      state.items = [];
      state.activeBoardId = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBoards.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;

        if (!state.activeBoardId && action.payload.length > 0) {
          state.activeBoardId = action.payload[0].id;
        }
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createBoard.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.activeBoardId = action.payload.id;
      })

      .addCase(updateBoard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          board => board.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
          };
        }
      })

      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.items = state.items.filter(board => board.id !== action.payload);

        if (state.activeBoardId === action.payload) {
          state.activeBoardId = state.items[0]?.id || null;
        }
      });
  },
});

export const { setActiveBoardId, clearBoards } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;