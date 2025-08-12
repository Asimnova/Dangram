import express from 'express';
const router = express.Router();
import { createPost, getPosts, likePost, commentPost, sharePost } from '../controllers/postController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

router.post('/', verifyToken, createPost);
router.get('/', verifyToken, getPosts);
router.post('/:postId/like', verifyToken, likePost);
router.post('/:postId/comment', verifyToken, commentPost);
router.post('/:postId/share', verifyToken, sharePost);

export default router;