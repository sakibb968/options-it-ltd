import { Router } from 'express';
import { fileController } from '../controllers/fileController';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Upload Single File (Image, PDF, Report)
router.post('/upload', authenticate, upload.single('file'), fileController.uploadFile);

// Upload Multiple Files
router.post('/upload-multiple', authenticate, upload.array('files', 10), fileController.uploadMultipleFiles);

export default router;
