import { ColumnCollection } from "../db/models/column.js";
import { BoardCollection } from "../db/models/board.js";
import { createHttpError } from "../utils/createHttpError.js";

export const createColumn = async (payload, userId) => {
  const { boardId } = payload;
  const board = await BoardCollection.findOne({
    _id: boardId,
    owner: userId,
  });
  if (!board) {
    throw createHttpError(404, "Board not found");
  }
  const column = await ColumnCollection.create(payload);
  return column;
};
export const getColumnsByBoard = async (boardId, userId) => {
  const board = await BoardCollection.findOne({
    _id: boardId,
    owner: userId,
  });

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  const columns = await ColumnCollection.find({ boardId }).sort({ order: 1 });

  return columns;
};
export const updateColumn = async (columnId, payload, userId) => {
  const column = await ColumnCollection.findById(columnId);
  if (!column) {
    throw createHttpError(404, "Column not found");
  }
  const board = await BoardCollection.findOne({
    _id: column.boardId,
    owner: userId,
  });
  if (!board) {
    throw createHttpError(403, "Forbidden");
  }
  const updated = await ColumnCollection.findByIdAndUpdate(columnId, payload, {
    new: true,
  });
  return updated;
};
export const deleteColumn = async (columnId, userId) => {
  const column = await ColumnCollection.findById(columnId);
  if (!column) {
    throw createHttpError(404, "Column not found");
  }
  const board = await BoardCollection.findOne({
    _id: column.boardId,
    owner: userId,
  });
  if (!board) {
    throw createHttpError(403, "Forbidden");
  }
  await ColumnCollection.findByIdAndDelete(columnId);
};
