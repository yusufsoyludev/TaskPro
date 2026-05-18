import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const getOwnerToken = thunkAPI => thunkAPI.getState().auth.token;

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
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.get('/boards');

      const boards = data.data || data;

      return {
        ownerToken,
        items: boards.map(normalizeBoard),
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

export const createBoard = createAsyncThunk(
  'boards/create',
  async (boardData, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.post('/boards', prepareBoardData(boardData));

      return {
        ownerToken,
        board: normalizeBoard(data.data || data),
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

export const updateBoard = createAsyncThunk(
  'boards/update',
  async ({ boardId, boardData }, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.patch(
  `/boards/${boardId}`,
  prepareBoardData(boardData),
);

      return {
        ownerToken,
        board: normalizeBoard(data.data || data),
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

export const deleteBoard = createAsyncThunk(
  'boards/delete',
  async (boardId, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      await api.delete(`/boards/${boardId}`);

      return {
        ownerToken,
        boardId,
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
