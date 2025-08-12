import express from 'express';
const router = express.Router();
import { uploadFile } from '../controllers/uploadController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

router.post('/', verifyToken, uploadFile);

export default router;