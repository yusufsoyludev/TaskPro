import { Router } from "express";
import { getTestController } from "../controllers/testControllers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
const router = Router();
router.get("/", ctrlWrapper(getTestController));
export default router;
