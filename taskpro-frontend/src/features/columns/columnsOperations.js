import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

const getOwnerToken = thunkAPI => thunkAPI.getState().auth.token;

const normalizeColumn = (column) => ({
  ...column,
  id: column.id || column._id,
  boardId: column.boardId || column.board,
});

export const fetchColumns = createAsyncThunk(
  'columns/fetchByBoard',
  async (boardId, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.get(`/columns/${boardId}`);
      const columns = data.data || data;

      return {
        ownerToken,
        boardId,
        items: columns.map(normalizeColumn),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        {
          ownerToken,
          message: error.response?.data?.message || error.message,
        },
      );
    }
  },
);
export const createColumn = createAsyncThunk(
  "columns/create",
  async ({ boardId, title }, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.post("/columns", { boardId, title });
      return {
        ownerToken,
        column: normalizeColumn(data.data || data),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        {
          ownerToken,
          message: error.response?.data?.message || "error.message,",
        },
      );
    }
  },
);

export const updateColumn = createAsyncThunk(
  "columns/update",
  async ({ columnId, title }, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.patch(`/columns/${columnId}`, { title });
      return {
        ownerToken,
        column: normalizeColumn(data.data || data),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        {
          ownerToken,
          message: error.response?.data?.message || error.message,
        },
      );
    }
  },
);
export const deleteColumn = createAsyncThunk(
  "columns/delete",
  async (columnId, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);
    const columnsByBoardId = thunkAPI.getState().columns.byBoardId || {};
    const boardId = Object.values(columnsByBoardId)
      .flat()
      .find(column => column.id === columnId)?.boardId ?? null;

    try {
      await api.delete(`/columns/${columnId}`);
      return {
        ownerToken,
        boardId,
        columnId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        {
          ownerToken,
          message: error.response?.data?.message || error.message,
        },
      );
    }
  },
);
