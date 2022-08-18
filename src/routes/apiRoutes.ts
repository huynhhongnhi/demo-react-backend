import { Router } from 'express';
import { loginValidation, registerValidation } from '../validations/UserValidation';
import userController from '../controllers/UserController';
import { isAuth } from '../middlewares/authMiddleware'

const router = Router();

// auth
router.post('/auth/login', [ loginValidation ], userController.loginAuth)
router.post('/auth/register', [ registerValidation ], userController.registerAuth)
router.get('/me', [ isAuth ], userController.getUser)

export default router