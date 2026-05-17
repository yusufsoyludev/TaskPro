export const selectCardsByColumnId = (state, columnId) =>
  state.cards.byColumnId[columnId] || [];

export const selectCardsByColumnMap = state => state.cards.byColumnId;

export const selectCardsLoading = state => state.cards.isLoading;
export const selectCardsError = state => state.cards.error;