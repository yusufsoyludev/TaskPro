import { Router } from 'express';
import {
  createColumnController,
  deleteColumnController,
  getColumnsController,
  updateColumnController,
} from '../controllers/columns.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createColumnSchema,
  updateColumnSchema,
} from '../validation/columns.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validateBody(createColumnSchema),
  ctrlWrapper(createColumnController),
);

router.get('/:boardId', ctrlWrapper(getColumnsController));
router.patch(
  '/:columnId',
  validateBody(updateColumnSchema),
  ctrlWrapper(updateColumnController),
);
router.delete('/:columnId', ctrlWrapper(deleteColumnController));

export default router;