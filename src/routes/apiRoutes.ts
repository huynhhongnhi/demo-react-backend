import { Router } from 'express';
import { loginValidation, registerValidation } from '../validations/UserValidation';
import userController from '../controllers/UserController';
import PostController from '../controllers/PostController';
import { isAuth } from '../middlewares/authMiddleware'

const router = Router();

// auth
router.post('/auth/login', [ loginValidation ], userController.loginAuth)
router.post('/auth/register', [ registerValidation ], userController.registerAuth)
router.get('/me', [ isAuth ], userController.getUser)

// posts
router.get('/posts', PostController.getAll);
router.get('/posts/:postId', PostController.detailPost);
router.post('/posts', PostController.addPost);
router.delete('/posts/:postId', PostController.deletePost)
router.patch('/posts/:postId', PostController.updatePost)

export default router