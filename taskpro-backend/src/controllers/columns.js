import {
  createColumn,
  deleteColumn,
  getColumnsByBoard,
  updateColumn,
} from "../services/columns.js";

export const createColumnController = async (req, res) => {
  const userId = req.user._id;
  const column = await createColumn(req.body, userId);
  res.status(201).json({
    status: 201,
    message: "Column created successfully",
    data: column,
  });
};
export const getColumnsController = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user._id;
  const columns = await getColumnsByBoard(boardId, userId);
  res.status(200).json({
    status: 200,
    message: "Successfully found columns",
    data: columns,
  });
};
export const updateColumnController = async (req, res) => {
  const { columnId } = req.params;
  const userId = req.user._id;
  const column = await updateColumn(columnId, req.body, userId);
  res.status(200).json({
    status: 200,
    message: "Column updated successfully",
    data: column,
  });
};
export const deleteColumnController = async (req, res) => {
  const { columnId } = req.params;
  const userId = req.user._id;
  await deleteColumn(columnId, userId);
  res.status(204).send();
};
