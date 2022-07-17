import { Router } from 'express';
import { AuthMiddleware, ValidationMiddleware } from '../../../middlewares';
import { RoleController } from '../../../controllers';
import { createRoleSchema, updateRoleSchema } from '../../../validations';

const router = new Router();
const { addRole, fetchAllRoles, updateRole, removeRole, getRole } = RoleController;
const { validate } = ValidationMiddleware;
const { authenticate } = AuthMiddleware;

router.use(authenticate);

router.post('/', validate(createRoleSchema), addRole);
router.get('/', fetchAllRoles);
router.put('/:roleId', validate(updateRoleSchema), updateRole);
router.delete('/:roleId', removeRole);
router.get('/:roleId', getRole);

export default router;
