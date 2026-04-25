import Joi from "joi";
export const createBoardSchema = Joi.object({
  title: Joi.string().min(2).max(64).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title should have a least 2 characters",
    "string.max": "Title should have at most 64 characters",
    any: "Title is required",
  }),
  icon: Joi.string().default("default"),
  background: Joi.string().allow("").default(""),
});
export const updateBoardSchema = Joi.object({
  title: Joi.string().min(2).max(64),
  icon: Joi.string(),
  background: Joi.string().allow(""),
}).min(1);
