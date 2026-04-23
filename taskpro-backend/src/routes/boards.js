import { Router } from 'express';
import {
  createBoardController,
  deleteBoardController,
  getAllBoardsController,
  getBoardByIdController,
  updateBoardController,
} from '../controllers/boards.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllBoardsController));
router.get('/:boardId', ctrlWrapper(getBoardByIdController));
router.post('/', ctrlWrapper(createBoardController));
router.patch('/:boardId', ctrlWrapper(updateBoardController));
router.delete('/:boardId', ctrlWrapper(deleteBoardController));

export default router;