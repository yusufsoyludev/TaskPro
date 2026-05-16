export const selectBoards = state => state.boards.items;
export const selectActiveBoardId = state => state.boards.activeBoardId;
export const selectBoardsLoading = state => state.boards.isLoading;
export const selectBoardsError = state => state.boards.error;

export const selectActiveBoard = state =>
  state.boards.items.find(board => board.id === state.boards.activeBoardId) ||
  null;