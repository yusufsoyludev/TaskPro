import { createSlice } from "@reduxjs/toolkit";
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
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.byColumnId[action.payload.columnId] = action.payload.cards));
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        const columnId = action.payload.columnId;
        if (!state.byColumnId[columnId]) {
          state.byColumnId[columnId] = [];
        }
        state.byColumnId[columnId].push(action.payload);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const columnId = action.payload.columnId;
        const cards = state.byColumnId[columnId] || [];
        const index = cards.findIndex((card) => card.id === action.payload.id);
        if (index !== -1) {
          cards[index] = action.payload;
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        Object.keys(state.byColumnId).forEach((columnId) => {
          state.byColumnId[columnId] = state.byColumnId[columnId].filter(
            (card) => card.id !== action.payload,
          );
        });
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        const movedCard = action.payload;

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

export const cardsReducer = cardsSlice.reducer;
