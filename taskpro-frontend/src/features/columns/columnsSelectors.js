export const selectColumns = state =>
  state.columns.byBoardId[state.boards.activeBoardId] || [];
export const selectColumnsByBoardMap = state => state.columns.byBoardId;
export const selectLoadedBoardIds = state => state.columns.loadedBoardIds;
export const selectLoadingBoardIds = state => state.columns.loadingBoardIds;
export const selectColumnsLoading = state => state.columns.isLoading;
export const selectColumnsError = state => state.columns.error;
