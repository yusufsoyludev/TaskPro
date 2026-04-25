import { Router } from 'express';
import {
  createCardController,
  deleteCardController,
  getCardsController,
  updateCardController,
  moveCardController,
} from '../controllers/cards.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.post('/', ctrlWrapper(createCardController));
router.get('/:columnId', ctrlWrapper(getCardsController));
router.patch('/:cardId', ctrlWrapper(updateCardController));
router.delete('/:cardId', ctrlWrapper(deleteCardController));
router.patch('/:cardId/move', ctrlWrapper(moveCardController));
router.patch('/:cardId', ctrlWrapper(updateCardController));

export default router;