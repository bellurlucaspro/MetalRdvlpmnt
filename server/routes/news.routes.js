import express from 'express';
import {
    getNews,
    getNewsBySlug,
    getAllNews,
    createNews,
    updateNews,
    deleteNews,
    getRelatedNews
} from '../controllers/news.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';
import { newsValidation, validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getNews);
router.get('/:slug', getNewsBySlug);
router.get('/:slug/related', getRelatedNews);

// Admin routes (protected)
router.get('/admin/all', protect, getAllNews);
router.post('/', protect, uploadSingle, newsValidation, validate, createNews);
router.put('/:id', protect, uploadSingle, updateNews);
router.delete('/:id', protect, deleteNews);

export default router;
