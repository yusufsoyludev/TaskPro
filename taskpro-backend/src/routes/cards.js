import { Router } from 'express';
import {
  createCardController,
  deleteCardController,
  getCardsController,
  moveCardController,
  updateCardController,
} from '../controllers/cards.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createCardSchema,
  moveCardSchema,
  updateCardSchema,
} from '../validation/cards.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validateBody(createCardSchema),
  ctrlWrapper(createCardController),
);

router.get('/:columnId', ctrlWrapper(getCardsController));

router.patch(
  '/:cardId/move',
  validateBody(moveCardSchema),
  ctrlWrapper(moveCardController),
);

router.patch(
  '/:cardId',
  validateBody(updateCardSchema),
  ctrlWrapper(updateCardController),
);

router.delete('/:cardId', ctrlWrapper(deleteCardController));

export default router;