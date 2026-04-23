import { Router } from 'express';
import {
  getCurrentUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post('/register', ctrlWrapper(registerUserController));
router.post('/login', ctrlWrapper(loginUserController));
router.get('/current', authenticate, ctrlWrapper(getCurrentUserController));
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default router;