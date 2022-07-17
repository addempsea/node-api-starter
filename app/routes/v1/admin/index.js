import { Router } from 'express';
import { AuthMiddleware, ValidationMiddleware } from '../../../middlewares';
import { AdminController } from '../../../controllers';
import { adminProfileSchema } from '../../../validations';

const router = new Router();
const { getAdminById, updateProfile } = AdminController;
const { validate } = ValidationMiddleware;
const { authenticate } = AuthMiddleware;

router.use(authenticate);

router.get('/', getAdminById);
router.put('/', validate(adminProfileSchema), updateProfile);

export default router;
