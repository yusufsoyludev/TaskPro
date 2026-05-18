import { Router } from "express";
import {
  getCurrentUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
  updateProfileController,
} from "../controllers/auth.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  loginUserSchema,
  registerUserSchema,
  updateProfileSchema,
} from "../validation/auth.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.get("/current", authenticate, ctrlWrapper(getCurrentUserController));
router.patch(
  "/profile",
  authenticate,
  validateBody(updateProfileSchema),
  ctrlWrapper(updateProfileController),
);
router.post("/logout", authenticate, ctrlWrapper(logoutUserController));

export default router;
