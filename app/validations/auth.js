import joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { emailCheck, passwordCheck, editStringCheck } = ValidationHelper;

export const loginSchema = joi.object({
  email: emailCheck(),
  password: passwordCheck()
});

export const adminProfileSchema = joi.object({
  firstName: editStringCheck('First name', 2, 255),
  lastName: editStringCheck('Last name', 2, 255),
  imageUrl: editStringCheck('Image url', 2)
});

export const forgotPasswordSchema = joi.object({
  email: emailCheck()
});
