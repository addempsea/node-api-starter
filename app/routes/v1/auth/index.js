import { Router } from 'express';
import {
  AuthMiddleware,
  AdminMiddleware,
  ValidationMiddleware
} from '../../../middlewares';
import { AuthController } from '../../../controllers';
import { loginSchema, forgotPasswordSchema } from '../../../validations';

const { adminLoginEmailValidator } = AdminMiddleware;
const { comparePassword, authenticate } = AuthMiddleware;
const { adminSignIn, resetPassword, forgotPassword } = AuthController;
const { validate } = ValidationMiddleware;

const router = Router();

router.post(
  '/admin/login',
  validate(loginSchema),
  adminLoginEmailValidator,
  comparePassword,
  adminSignIn
);

router.post('/admin/reset-password', authenticate, resetPassword);
router.post('/admin/forgot-password', validate(forgotPasswordSchema), forgotPassword);

export default router;
