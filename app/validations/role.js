import Joi from 'joi';
import { ValidationHelper } from '../utils/helpers';

const { stringCheck, editStringCheck } = ValidationHelper;

export const createRoleSchema = Joi.object({
  name: stringCheck('Name', 3, 255),
  permissions: stringCheck('Permissions', 3),
  description: editStringCheck('Description', 3, 255),
});

export const updateRoleSchema = Joi.object({
  name: editStringCheck('Name', 3, 255),
  permissions: editStringCheck('Permissions', 3),
  description: editStringCheck('Description', 3, 255),
});
