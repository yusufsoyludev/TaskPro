import Joi from 'joi';

export const registerUserSchema=Joi.object({
    name:Joi.string().min(2).max(32).required().messages({
        'string.base':'Name must be a string',
        'string.empty':'Name is required',
        'string.min':'Name should have at least 2 characters',
        'string.max':'Name should have at most 32 characters',
        'any.required':'Name is required',
    }),
    email:Joi.string().email().required().messages({
        'string.base':'Email must be a string',
        'string.empty':'Email is required',
        'string.email':'Email must be valid',
        'any.required':'Email is required',

    }),
    password:Joi.string().min(8).max(64).required().messages({
        'string.base':'Password must be a stiring',
        'string.empty':'Password is required',
        'string.min':'Password should have at least 2 characters',
        'string.max':'Password should have at most 64 characters',
        'any.required':'Password is required',
    }),
});

export const loginUserSchema=Joi.object({
    email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password should have at least 8 characters',
    'string.max': 'Password should have at most 64 characters',
    'any.required': 'Password is required',
  }),
});