import { Router } from 'express';
import authRoutes from './auth';
import roleRoutes from './role';
import uploadRoutes from './upload';
import adminRoutes from './admin';

const router = Router();

router.use('/auth', authRoutes);
router.use('/role', roleRoutes);
router.use('/upload', uploadRoutes);
router.use('/admin', adminRoutes);

export default router;
