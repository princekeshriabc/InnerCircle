import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import {body} from 'express-validator';

const router = Router();

router.post('/register',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('password').notEmpty().withMessage('Password is required'),

    userController.createUserController);

export default router;