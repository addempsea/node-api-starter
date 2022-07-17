import { Router } from 'express';
import { UploadController } from '../../../controllers';
import { UploadMiddleware, ValidationMiddleware } from '../../../middlewares';

const router = Router();
const { uploadFile, checkIfFileSizeOverLimit, checkIfFileTypeIsAllowed } = UploadMiddleware;
const { validateFile } = ValidationMiddleware;
const { uploadMedia } = UploadController;

router.post(
  '/',
  validateFile,
  checkIfFileTypeIsAllowed,
  checkIfFileSizeOverLimit,
  uploadFile,
  uploadMedia
);

export default router;
