import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser } from '../auth/authOperations';
import {
  fetchCards,
  createCard,
  updateCard,
  deleteCard,
  moveCard,
} from "./cardsOperations";
import {
  createColumn,
  deleteColumn,
} from '../columns/columnsOperations';

const initialState = {
  byColumnId: {},
  loadedColumnIds: {},
  loadingColumnIds: {},
  pendingCreateByRequestId: {},
  pendingUpdateByRequestId: {},
  pendingMoveByRequestId: {},
  isLoading: false,
  error: null,
  ownerToken: null,
};

const resetCardsState = state => {
  state.byColumnId = {};
  state.loadedColumnIds = {};
  state.loadingColumnIds = {};
  state.pendingCreateByRequestId = {};
  state.pendingUpdateByRequestId = {};
  state.pendingMoveByRequestId = {};
  state.isLoading = false;
  state.error = null;
};

const isCurrentOwner = (state, ownerToken) => state.ownerToken === ownerToken;

const createTempCardId = requestId => `temp-${requestId}`;

const findCardLocation = (state, cardId) => {
  for (const [columnId, cards] of Object.entries(state.byColumnId)) {
    const index = (cards || []).findIndex(card => card.id === cardId);

    if (index !== -1) {
      return {
        columnId,
        index,
        card: cards[index],
      };
    }
  }

  return null;
};

const insertCardAt = (cards, card, index = cards.length) => {
  const nextCards = [...cards];
  const safeIndex = Math.max(0, Math.min(index, nextCards.length));

  nextCards.splice(safeIndex, 0, card);

  return nextCards;
};

const replaceOrAppendCard = (cards, cardId, nextCard) => {
  const cardIndex = cards.findIndex(card => card.id === cardId);

  if (cardIndex === -1) {
    return [...cards, nextCard];
  }

  return cards.map(card => (card.id === cardId ? nextCard : card));
};

const buildOptimisticCard = ({
  cardId,
  columnId,
  cardData,
  fallbackCard,
  requestId,
}) => ({
  ...(fallbackCard || {}),
  ...(cardData || {}),
  id: fallbackCard?.id || cardId || createTempCardId(requestId),
  columnId: cardData?.columnId || columnId || fallbackCard?.columnId || null,
});

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    clearCards(state) {
      resetCardsState(state);
      state.ownerToken = null;
    },
  },
  extraReducers: builder => {
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
      .addCase(fetchCards.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.loadingColumnIds[action.meta.arg] = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.isLoading = false;
        state.byColumnId[action.payload.columnId] = action.payload.cards;
        state.loadedColumnIds[action.payload.columnId] = true;
        delete state.loadingColumnIds[action.payload.columnId];
      })
      .addCase(fetchCards.rejected, (state, action) => {
        if (!isCurrentOwner(state, action.payload?.ownerToken)) {
          return;
        }

        state.isLoading = false;
        state.error = action.payload?.message || action.payload;
        delete state.loadingColumnIds[action.meta.arg];
      })
      .addCase(createCard.pending, (state, action) => {
        const { columnId, cardData } = action.meta.arg;
        const tempId = createTempCardId(action.meta.requestId);
        const optimisticCard = {
          ...buildOptimisticCard({
            columnId,
            cardData,
            requestId: action.meta.requestId,
          }),
          id: tempId,
          columnId,
          isOptimistic: true,
        };

        state.error = null;
        state.loadedColumnIds[columnId] = true;
        state.pendingCreateByRequestId[action.meta.requestId] = {
          columnId,
          tempId,
        };
        state.byColumnId[columnId] = [
          ...(state.byColumnId[columnId] || []),
          optimisticCard,
        ];
      })
      .addCase(createCard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        const pendingCreate =
          state.pendingCreateByRequestId[action.meta.requestId];
        const targetColumnId =
          action.payload.card.columnId || pendingCreate?.columnId;

        delete state.pendingCreateByRequestId[action.meta.requestId];

        if (!targetColumnId) {
          return;
        }

        const nextCard = {
          ...action.payload.card,
          columnId: targetColumnId,
        };

        state.loadedColumnIds[targetColumnId] = true;

        if (!pendingCreate) {
          state.byColumnId[targetColumnId] = replaceOrAppendCard(
            state.byColumnId[targetColumnId] || [],
            nextCard.id,
            nextCard,
          );
          return;
        }

        const sourceColumnId = pendingCreate.columnId || targetColumnId;

        if (sourceColumnId !== targetColumnId) {
          state.byColumnId[sourceColumnId] = (
            state.byColumnId[sourceColumnId] || []
          ).filter(card => card.id !== pendingCreate.tempId);
        }

        const targetCards = state.byColumnId[targetColumnId] || [];
        const hasTempCard = targetCards.some(
          card => card.id === pendingCreate.tempId,
        );

        state.byColumnId[targetColumnId] = hasTempCard
          ? targetCards.map(card =>
              card.id === pendingCreate.tempId ? nextCard : card,
            )
          : replaceOrAppendCard(targetCards, nextCard.id, nextCard);
      })
      .addCase(createCard.rejected, (state, action) => {
        if (
          action.payload?.ownerToken &&
          !isCurrentOwner(state, action.payload.ownerToken)
        ) {
          return;
        }

        const pendingCreate =
          state.pendingCreateByRequestId[action.meta.requestId];

        if (pendingCreate) {
          state.byColumnId[pendingCreate.columnId] = (
            state.byColumnId[pendingCreate.columnId] || []
          ).filter(card => card.id !== pendingCreate.tempId);
          delete state.pendingCreateByRequestId[action.meta.requestId];
        }

        state.error =
          action.payload?.message || action.error?.message || action.payload;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        state.byColumnId[action.payload.column.id] = [];
        state.loadedColumnIds[action.payload.column.id] = true;
      })
      .addCase(updateCard.pending, (state, action) => {
        const { cardId, cardData } = action.meta.arg;
        const currentLocation = findCardLocation(state, cardId);

        if (!currentLocation) {
          return;
        }

        state.error = null;
        state.loadedColumnIds[currentLocation.columnId] = true;
        state.pendingUpdateByRequestId[action.meta.requestId] = {
          columnId: currentLocation.columnId,
          previousCard: { ...currentLocation.card },
          previousIndex: currentLocation.index,
        };
        state.byColumnId[currentLocation.columnId] = replaceOrAppendCard(
          state.byColumnId[currentLocation.columnId] || [],
          cardId,
          buildOptimisticCard({
            cardId,
            columnId: currentLocation.columnId,
            cardData,
            fallbackCard: currentLocation.card,
            requestId: action.meta.requestId,
          }),
        );
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        const pendingUpdate =
          state.pendingUpdateByRequestId[action.meta.requestId];
        const updatedCard = action.payload.card || action.payload;

        delete state.pendingUpdateByRequestId[action.meta.requestId];

        if (!updatedCard?.id) {
          return;
        }

        const currentLocation = findCardLocation(state, updatedCard.id);
        const targetColumnId =
          updatedCard.columnId ||
          currentLocation?.columnId ||
          pendingUpdate?.columnId;

        if (!targetColumnId) {
          return;
        }

        const nextCard = {
          ...(currentLocation?.card || pendingUpdate?.previousCard || {}),
          ...updatedCard,
          columnId: updatedCard.columnId || targetColumnId,
        };

        state.loadedColumnIds[targetColumnId] = true;

        if (currentLocation && currentLocation.columnId !== targetColumnId) {
          state.byColumnId[currentLocation.columnId] = (
            state.byColumnId[currentLocation.columnId] || []
          ).filter(card => card.id !== updatedCard.id);
        }

        state.byColumnId[targetColumnId] = replaceOrAppendCard(
          state.byColumnId[targetColumnId] || [],
          updatedCard.id,
          nextCard,
        );
      })
      .addCase(updateCard.rejected, (state, action) => {
        if (
          action.payload?.ownerToken &&
          !isCurrentOwner(state, action.payload.ownerToken)
        ) {
          return;
        }

        const pendingUpdate =
          state.pendingUpdateByRequestId[action.meta.requestId];

        if (pendingUpdate) {
          const currentLocation = findCardLocation(state, action.meta.arg.cardId);
          const targetColumnId = pendingUpdate.columnId;
          const targetCards = state.byColumnId[targetColumnId] || [];

          if (currentLocation && currentLocation.columnId !== targetColumnId) {
            state.byColumnId[currentLocation.columnId] = (
              state.byColumnId[currentLocation.columnId] || []
            ).filter(card => card.id !== pendingUpdate.previousCard.id);
          }

          state.byColumnId[targetColumnId] = insertCardAt(
            targetCards.filter(card => card.id !== pendingUpdate.previousCard.id),
            pendingUpdate.previousCard,
            pendingUpdate.previousIndex,
          );

          delete state.pendingUpdateByRequestId[action.meta.requestId];
        }

        state.error =
          action.payload?.message || action.error?.message || action.payload;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        const columnId = Object.keys(state.byColumnId).find(key =>
          (state.byColumnId[key] || []).some(card => card.id === action.payload.cardId),
        );

        if (columnId) {
          state.byColumnId[columnId] = (state.byColumnId[columnId] || []).filter(
            card => card.id !== action.payload.cardId,
          );
        }
      })
      .addCase(moveCard.pending, (state, action) => {
        const { cardId, targetColumnId } = action.meta.arg;
        const currentLocation = findCardLocation(state, cardId);

        if (
          !currentLocation ||
          !targetColumnId ||
          currentLocation.columnId === targetColumnId
        ) {
          return;
        }

        state.error = null;
        state.pendingMoveByRequestId[action.meta.requestId] = {
          sourceColumnId: currentLocation.columnId,
          sourceIndex: currentLocation.index,
          targetColumnId,
          previousCard: { ...currentLocation.card },
        };
        state.byColumnId[currentLocation.columnId] = (
          state.byColumnId[currentLocation.columnId] || []
        ).filter(card => card.id !== cardId);
        state.byColumnId[targetColumnId] = [
          ...(state.byColumnId[targetColumnId] || []).filter(
            card => card.id !== cardId,
          ),
          {
            ...currentLocation.card,
            columnId: targetColumnId,
          },
        ];
        state.loadedColumnIds[targetColumnId] = true;
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        const pendingMove = state.pendingMoveByRequestId[action.meta.requestId];
        const targetColumnId =
          action.payload.card.columnId ||
          action.payload.targetColumnId ||
          pendingMove?.targetColumnId;

        delete state.pendingMoveByRequestId[action.meta.requestId];

        if (!targetColumnId) {
          return;
        }

        const currentLocation = findCardLocation(state, action.payload.card.id);
        const movedCard = {
          ...(currentLocation?.card || pendingMove?.previousCard || {}),
          ...action.payload.card,
          columnId: targetColumnId,
        };

        if (currentLocation && currentLocation.columnId !== targetColumnId) {
          state.byColumnId[currentLocation.columnId] = (
            state.byColumnId[currentLocation.columnId] || []
          ).filter(card => card.id !== movedCard.id);
        }

        state.loadedColumnIds[targetColumnId] = true;
        state.byColumnId[targetColumnId] = replaceOrAppendCard(
          state.byColumnId[targetColumnId] || [],
          movedCard.id,
          movedCard,
        );
      })
      .addCase(moveCard.rejected, (state, action) => {
        if (
          action.payload?.ownerToken &&
          !isCurrentOwner(state, action.payload.ownerToken)
        ) {
          return;
        }

        const pendingMove = state.pendingMoveByRequestId[action.meta.requestId];

        if (pendingMove) {
          state.byColumnId[pendingMove.targetColumnId] = (
            state.byColumnId[pendingMove.targetColumnId] || []
          ).filter(card => card.id !== action.meta.arg.cardId);
          state.byColumnId[pendingMove.sourceColumnId] = insertCardAt(
            (
              state.byColumnId[pendingMove.sourceColumnId] || []
            ).filter(card => card.id !== pendingMove.previousCard.id),
            pendingMove.previousCard,
            pendingMove.sourceIndex,
          );
          state.loadedColumnIds[pendingMove.sourceColumnId] = true;
          delete state.pendingMoveByRequestId[action.meta.requestId];
        }

        state.error =
          action.payload?.message || action.error?.message || action.payload;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        if (!isCurrentOwner(state, action.payload.ownerToken)) {
          return;
        }

        delete state.byColumnId[action.payload.columnId];
        delete state.loadedColumnIds[action.payload.columnId];
        delete state.loadingColumnIds[action.payload.columnId];
      });
  },
});

export const { clearCards } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
