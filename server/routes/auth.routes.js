import express from 'express';
import {
    login,
    getMe,
    verifyToken,
    initAdmin
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { loginValidation, validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public routes
router.post('/login', loginValidation, validate, login);
router.post('/init', initAdmin);

// Protected routes
router.get('/me', protect, getMe);
router.get('/verify', protect, verifyToken);

export default router;
