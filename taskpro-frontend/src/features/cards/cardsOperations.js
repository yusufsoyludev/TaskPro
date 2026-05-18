import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const getOwnerToken = thunkAPI => thunkAPI.getState().auth.token;

const priorityMap = {
  grey: 'without',
  gray: 'without',
  green: 'low',
  pink: 'medium',
  purple: 'high',
};

const labelColorMap = {
  without: 'grey',
  low: 'green',
  medium: 'pink',
  high: 'purple',
};

const normalizeCard = card => ({
  ...card,
  id: card.id || card._id,
  columnId: card.columnId || card.column,
  labelColor: card.labelColor || labelColorMap[card.priority] || 'grey',
});

const extractCardResponse = responseData => {
  const payload = responseData?.data || responseData;

  return payload?.card || payload;
};

const prepareCardData = cardData => {
  const allowedData = { ...cardData };

  delete allowedData._id;
  delete allowedData.id;
  delete allowedData.columnId;
  delete allowedData.column;
  delete allowedData.order;
  delete allowedData.createdAt;
  delete allowedData.updatedAt;

  if ('labelColor' in allowedData) {
    allowedData.priority = priorityMap[allowedData.labelColor] || 'without';
    delete allowedData.labelColor;
  }

  return allowedData;
};

export const fetchCards = createAsyncThunk(
  'cards/fetchByColumn',
  async (columnId, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.get(`/cards/${columnId}`);
      const cards = data.data || data;

      return {
        ownerToken,
        columnId,
        cards: cards.map(normalizeCard),
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

export const createCard = createAsyncThunk(
  'cards/create',
  
  async ({ columnId, cardData }, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.post('/cards', {
  columnId,
  ...prepareCardData(cardData),
});

      const normalizedCard = normalizeCard(extractCardResponse(data));

      return {
        ownerToken,
        card: {
          ...normalizedCard,
          columnId: normalizedCard.columnId || columnId,
        },
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

export const updateCard = createAsyncThunk(
  'cards/update',
  async ({ cardId, cardData }, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.patch(
        `/cards/${cardId}`,
        prepareCardData(cardData),
      );

      return {
        ownerToken,
        card: normalizeCard(extractCardResponse(data)),
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

export const deleteCard = createAsyncThunk(
  'cards/delete',
  async (cardId, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      await api.delete(`/cards/${cardId}`);
      return {
        ownerToken,
        cardId,
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

export const moveCard = createAsyncThunk(
  'cards/move',
  async ({ cardId, targetColumnId }, thunkAPI) => {
    const ownerToken = getOwnerToken(thunkAPI);

    try {
      const { data } = await api.patch(`/cards/${cardId}/move`, {
        targetColumnId,
      });

      const normalizedCard = normalizeCard(extractCardResponse(data));

      return {
        ownerToken,
        targetColumnId,
        card: {
          ...normalizedCard,
          columnId: normalizedCard.columnId || targetColumnId,
        },
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
