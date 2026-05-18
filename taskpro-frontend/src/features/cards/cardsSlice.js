import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser } from '../auth/authOperations';
import {
  fetchCards,
  createCard,
  updateCard,
  deleteCard,
  moveCard,
} from "./cardsOperations";

const initialState = {
  byColumnId: {},
  isLoading: false,
  error: null,
  ownerToken: null,
};

const resetCardsState = state => {
  state.byColumnId = {};
  state.isLoading = false;
  state.error = null;
};

const isCurrentOwner = (state, ownerToken) => state.ownerToken === ownerToken;

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    clearCards(state) {
      resetCardsState(state);
      state.ownerToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, state => {
        resetCardsState(state);
        state.ownerToken = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        resetCardsState(state);
        state.ownerToken = action.payload.accessToken || null;
      })
      .addCase(login.rejected, state => {
        resetCardsState(state);
        state.ownerToken = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        resetCardsState(state);
        state.ownerToken = action.payload.token || null;
      })
      .addCase(refreshUser.rejected, state => {
        resetCardsState(state);
        state.ownerToken = null;
      })
      .addCase(logout.fulfilled, state => {
        resetCardsState(state);
        state.ownerToken = null;
      })
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.isLoading = false;
        state.byColumnId[action.payload.columnId] = action.payload.cards;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        if (!isCurrentOwner(state, action.payload?.ownerToken)) {
          return;
        }

        state.isLoading = false;
        state.error = action.payload?.message || action.payload;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        const columnId = action.payload.card.columnId;
        if (!state.byColumnId[columnId]) {
          state.byColumnId[columnId] = [];
        }
        state.byColumnId[columnId].push(action.payload.card);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        const columnId = action.payload.card.columnId;
        const cards = state.byColumnId[columnId] || [];
        const index = cards.findIndex((card) => card.id === action.payload.card.id);
        if (index !== -1) {
          cards[index] = action.payload.card;
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        Object.keys(state.byColumnId).forEach((columnId) => {
          state.byColumnId[columnId] = state.byColumnId[columnId].filter(
            (card) => card.id !== action.payload.cardId,
          );
        });
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        const movedCard = action.payload.card;

        Object.keys(state.byColumnId).forEach((columnId) => {
          state.byColumnId[columnId] = state.byColumnId[columnId].filter(
            (card) => card.id !== movedCard.id,
          );
        });

        if (!state.byColumnId[movedCard.columnId]) {
          state.byColumnId[movedCard.columnId] = [];
        }

        state.byColumnId[movedCard.columnId].push(movedCard);
      });
  },
});

export const { clearCards } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
