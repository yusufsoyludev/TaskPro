import { Router } from 'express';
import {
  createColumnController,
  deleteColumnController,
  getColumnsController,
  updateColumnController,
} from '../controllers/columns.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.post('/', ctrlWrapper(createColumnController));
router.get('/:boardId', ctrlWrapper(getColumnsController));
router.patch('/:columnId', ctrlWrapper(updateColumnController));
router.delete('/:columnId', ctrlWrapper(deleteColumnController));

export default router;