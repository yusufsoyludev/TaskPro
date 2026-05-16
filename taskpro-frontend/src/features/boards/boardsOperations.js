import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const normalizeBoard = board => ({
  ...board,
  id: board.id || board._id,
  bgId: board.bgId || board.background || '',
});
const prepareBoardData = boardData => {
  const allowedData = { ...boardData };

  if ('bgId' in allowedData) {
    allowedData.background = allowedData.bgId || '';
    delete allowedData.bgId;
  }

  delete allowedData.selectedIconIndex;

  return allowedData;
};

export const fetchBoards = createAsyncThunk(
  'boards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/boards');

      const boards = data.data || data;

      return boards.map(normalizeBoard);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const createBoard = createAsyncThunk(
  'boards/create',
  async (boardData, thunkAPI) => {
    try {
      const { data } = await api.post('/boards', prepareBoardData(boardData));

      return normalizeBoard(data.data || data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const updateBoard = createAsyncThunk(
  'boards/update',
  async ({ boardId, boardData }, thunkAPI) => {
    try {
      const { data } = await api.patch(
  `/boards/${boardId}`,
  prepareBoardData(boardData),
);

      return normalizeBoard(data.data || data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const deleteBoard = createAsyncThunk(
  'boards/delete',
  async (boardId, thunkAPI) => {
    try {
      await api.delete(`/boards/${boardId}`);

      return boardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);