import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { body } from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('password').notEmpty().withMessage('Password is required'),
    body('emailDomain').notEmpty().withMessage('Email domain is empty'),

    userController.createUserController);

router.post('/login',
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),

    userController.loginUserController);

router.post('/login-google',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    body('emailDomain').notEmpty().withMessage('Email domain is empty'),

    userController.loginGoogleUserController);


router.get('/profile', authMiddleware.authUser, userController.profileController);

router.get('/logout', authMiddleware.authUser, userController.logoutController);
router.get(
  "/all",
  authMiddleware.authUser,
  userController.getAllUsersController
);

router.post("/forgot-password", userController.forgotPasswordController);
router.post("/reset-password/:token", userController.resetPasswordController);


export default router;