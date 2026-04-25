import Joi from 'joi';

export const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(64).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title should have at least 2 characters',
    'string.max': 'Title should have at most 64 characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().max(500).allow('').default(''),
  priority: Joi.string()
    .valid('without', 'low', 'medium', 'high')
    .default('without'),
  deadline: Joi.date().allow(null),
  columnId: Joi.string().required().messages({
    'string.empty': 'Column id is required',
    'any.required': 'Column id is required',
  }),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().min(2).max(64),
  description: Joi.string().max(500).allow(''),
  priority: Joi.string().valid('without', 'low', 'medium', 'high'),
  deadline: Joi.date().allow(null),
}).min(1);

export const moveCardSchema = Joi.object({
  targetColumnId: Joi.string().required().messages({
    'string.empty': 'Target column id is required',
    'any.required': 'Target column id is required',
  }),
});