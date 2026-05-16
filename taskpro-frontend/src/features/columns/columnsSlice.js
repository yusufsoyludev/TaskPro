import { createSlice } from "@reduxjs/toolkit";
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
};
const columnsSlice = createSlice({
  name: "columns",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(fetchColumns.pending, state => {
  state.isLoading = true;
  state.error = null;
})
.addCase(fetchColumns.fulfilled, (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
})
.addCase(fetchColumns.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createColumn.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateColumn.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteColumn.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});
export const columnsReducer = columnsSlice.reducer;
