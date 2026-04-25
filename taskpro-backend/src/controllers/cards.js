import {
  createCard,
  deleteCard,
  getCardsByColumn,
  updateCard,
  moveCard,
} from "../services/cards.js";

export const createCardController = async (req, res) => {
  const userId = req.user._id;
  const card = await createCard(req.body, userId);
  res.status(201).json({
    status: 201,
    message: "Card created successfully",
    data: card,
  });
};
export const getCardsController = async (req, res) => {
  const { columnId } = req.params;
  const userId = req.user._id;
  const cards = await getCardsByColumn(columnId, userId);
  res.status(200).json({
    status: 200,
    message: "Successfully found cards",
    data: cards,
  });
};
export const updateCardController = async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  const card = await updateCard(cardId, req.body, userId);
  res.status(200).json({
    status: 200,
    message: "Card updated successfully",
    data: card,
  });
};
export const deleteCardController = async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  await deleteCard(cardId, userId);
  res.status(204).send();
};
export const moveCardController = async (req, res) => {
  const { cardId } = req.params;
  const { targetColumnId } = req.body;
  const userId = req.user._id;
  const card = await moveCard(cardId, targetColumnId, userId);
  req.status(200).json({
    status: 200,
    message: "Card moved successfully",
    data: card,
  });
};
