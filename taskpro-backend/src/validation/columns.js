import Joi from "joi";
export const createColumnSchema = Joi.object({
  title: Joi.string().min(2).max(64).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title should have at least 2 characters",
    "string.max": "Title should have at most 64 characters",
    "any.required": "Title is required",
  }),
  boardId: Joi.string().required().messages({
    "string.empty": "Board id is required",
    "any.required": "Board id is required",
  }),
});
export const updateColumnSchema = Joi.object({
  title: Joi.string().min(2).max(64).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title should have at least 2 characters",
    "string.max": "Title should have at most 64 characters",
    "any.required": "Title is required",
  }),
});
