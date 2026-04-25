import { CardCollection } from "../db/models/card.js";
import { ColumnCollection } from "../db/models/column.js";
import { BoardCollection } from "../db/models/board.js";
import { createHttpError } from "../utils/createHttpError.js";

export const createCard = async (payload, userId) => {
  const { columnId } = payload;
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
  const card = await CardCollection.create(payload);
  return card;
};
export const getCardsByColumn = async (columnId, userId) => {
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
  const cards = await CardCollection.find({ columnId }).sort({ order: 1 });
  return cards;
};
export const updateCard = async (cardId, payload, userId) => {
  const card = await CardCollection.findById(cardId);
  if (!card) {
    throw createHttpError(404, "Card not found");
  }
  const column = await ColumnCollection.findById(card.columnId);
  const board = await BoardCollection.findOne({
    _id: column.boardId,
    owner: userId,
  });
  if (!board) {
    throw createHttpError(403, "Forbidden");
  }
  const updated = await CardCollection.findByIdAndUpdate(cardId, payload, {
    new: true,
  });
};
export const deleteCard = async (cardId, userId) => {
  const card = await CardCollection.findById(cardId);
  if (!card) {
    throw createHttpError(404, "Card not found");
  }
  const column = await ColumnCollection.findById(card.columnId);
  const board = await BoardCollection.findOne({
    _id: column.boardId,
    owner: userId,
  });
  if (!board) {
    throw createHttpError(403, "Forbidden");
  }
  await CardCollection.findByIdAndDelete(cardId);
};
export const moveCard = async (cardId, targetColumnId, userId) => {
  const card = await CardCollection.findById(cardId);
  if (!card) {
    throw createHttpError(404, "Card not found");
  }
  const targetColumn = await ColumnCollection.findById(targetColumnId);
  if (!targetColumn) {
    throw createHttpError(404, "Target column not found");
  }
  const targetBoard = await BoardCollection.findOne({
    _id: targetColumn.boardId,
    owner: userId,
  });
  if (!targetBoard) {
    throw createHttpError(403, "Forbidden");
  }
  const updatedCard = await CardCollection.findByIdAndUpdate(
    cardId,
    { columnId: targetColumnId },
    { new: true },
  );
  return updatedCard;
};
