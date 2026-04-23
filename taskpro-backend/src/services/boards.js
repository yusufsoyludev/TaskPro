import { BoardCollection } from "../db/models/board.js";
import { createHttpError } from "../utils/createHttpError.js";

export const createBoard = async (payload, userId) => {
  const board = await BoardCollection.create({
    ...payload,
    owner: userId,
  });
  return board;
};
export const getAllBoards = async (userId) => {
  const boards = await BoardCollection.find({ owner: userId });
  return boards;
};
export const getBoardById = async (boardId, userId) => {
  const board = await BoardCollection.findOne({
    _id: boardId,
    owner: userId,
  });
  if (!board) {
    throw createHttpError(404, "Board not found");
  }
  return board;
};
export const updateBoard = async (BoardId, payload, userId) => {
  const board = await BoardCollection.findOneAndUpdate(
    { _id: BoardId, owner: userId },
    payload,
    { new: true },
  );
  if (!board) {
    throw createHttpError(404, "Board not found");
  }
  return board;
};
export const deleteBoard = async (boardId, userId) => {
  const board = await BoardCollection.findOneAndDelete({
    _id: boardId,
    owner: userId,
  });
  if (!board) {
    throw createHttpError(404, "Board not found");
  }
  return board;
};
