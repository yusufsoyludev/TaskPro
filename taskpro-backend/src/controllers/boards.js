import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
} from "../services/boards.js";

export const createBoardController = async (req, res) => {
  const userId = req.user._id;
  const board = await createBoard(req.body, userId);
  res.status(202).json({
    status: 201,
    message: "Board created succesfully",
    data: board,
  });
};
export const getAllBoardsController = async (req, res) => {
  const userId = req.user._id;
  const boards = await getAllBoards(userId);
  res.status(200).json({
    status: 200,
    message: "Successfully found boards",
    data: boards,
  });
};
export const getBoardByIdController = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user._id;
  const board = await getBoardById(boardId, userId);
  res.status(200).json({
    status: 200,
    message: "Successfully found board",
    data: board,
  });
};
export const updateBoardController = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user._id;
  const board = await updateBoard(boardId, req.body, userId);
  res.status(200).json({
    status: 200,
    message: "Board updated successfully",
    data: board,
  });
};
export const deleteBoardController = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user._id;
  await deleteBoard(boardId, userId);
  res.status(204).send();
};
