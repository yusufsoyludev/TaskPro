import { Router } from 'express';
import {
  getCurrentUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.get('/current', authenticate, ctrlWrapper(getCurrentUserController));
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default router;