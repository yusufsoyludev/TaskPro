import Joi from "joi";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 32;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 64;

export const registerUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(NAME_MIN_LENGTH)
    .max(NAME_MAX_LENGTH)
    .required()
    .messages({
      "string.base": "Please enter a valid name.",
      "string.empty": "Please enter your name.",
      "string.min": `Name must be at least ${NAME_MIN_LENGTH} characters.`,
      "string.max": `Name must be ${NAME_MAX_LENGTH} characters or fewer.`,
      "any.required": "Please enter your name.",
    }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Please enter a valid email address.",
      "string.empty": "Please enter your email address.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Please enter your email address.",
    }),
  password: Joi.string()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      "string.base": "Please enter a valid password.",
      "string.empty": "Please enter a password.",
      "string.min": `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
      "string.max": `Password must be ${PASSWORD_MAX_LENGTH} characters or fewer.`,
      "any.required": "Please enter a password.",
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Please enter a valid email address.",
      "string.empty": "Please enter your email address.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Please enter your email address.",
    }),
  password: Joi.string()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      "string.base": "Please enter a valid password.",
      "string.empty": "Please enter your password.",
      "string.min": `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
      "string.max": `Password must be ${PASSWORD_MAX_LENGTH} characters or fewer.`,
      "any.required": "Please enter your password.",
    }),
});

export const updateProfileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(NAME_MIN_LENGTH)
    .max(NAME_MAX_LENGTH)
    .optional()
    .messages({
      "string.base": "Please enter a valid name.",
      "string.empty": "Name cannot be empty.",
      "string.min": `Name must be at least ${NAME_MIN_LENGTH} characters.`,
      "string.max": `Name must be ${NAME_MAX_LENGTH} characters or fewer.`,
    }),
  avatarUrl: Joi.string().optional().messages({
    "string.base": "Avatar URL must be a string.",
  }),
});
