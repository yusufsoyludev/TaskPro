import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

const normalizeColumn = (column) => ({
  ...column,
  id: column.id || column._id,
  boardId: column.boardId || column.board,
});

export const fetchColumns = createAsyncThunk(
  'columns/fetchByBoard',
  async (boardId, thunkAPI) => {
    try {
      const { data } = await api.get(`/columns/${boardId}`);
      const columns = data.data || data;

      return columns.map(normalizeColumn);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
export const createColumn = createAsyncThunk(
  "columns/create",
  async ({ boardId, title }, thunkAPI) => {
    try {
      const { data } = await api.post("/columns", { boardId, title });
      return normalizeColumn(data.data || data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "error.message,",
      );
    }
  },
);

export const updateColumn = createAsyncThunk(
  "columns/update",
  async ({ columnId, title }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/columns/${columnId}`, { title });
      return normalizeColumn(data.data || data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
export const deleteColumn = createAsyncThunk(
  "columns/delete",
  async (columnId, thunkAPI) => {
    try {
      await api.delete(`/columns/${columnId}`);
      return columnId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
