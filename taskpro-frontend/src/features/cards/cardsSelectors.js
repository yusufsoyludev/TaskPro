export const selectCardsByColumnId = (state, columnId) =>
  state.cards.byColumnId[columnId] || [];

export const selectCardsByColumnMap = state => state.cards.byColumnId;
export const selectLoadedCardColumnIds = state => state.cards.loadedColumnIds;
export const selectLoadingCardColumnIds = state => state.cards.loadingColumnIds;

export const selectCardsLoading = state => state.cards.isLoading;
export const selectCardsError = state => state.cards.error;
