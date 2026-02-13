import express from 'express';
import {
    getRealisations,
    getRealisationBySlug,
    getAllRealisations,
    createRealisation,
    updateRealisation,
    deleteRealisation,
    uploadGalleryImage,
    deleteGalleryImage
} from '../controllers/realisations.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';
import { realisationValidation, validate } from '../middleware/validation.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getRealisations);
router.get('/:slug', getRealisationBySlug);

// Admin routes (protected)
router.get('/admin/all', protect, getAllRealisations);
router.post('/', protect, uploadSingle, realisationValidation, validate, createRealisation);
router.put('/:id', protect, uploadSingle, updateRealisation);
router.delete('/:id', protect, deleteRealisation);

// Gallery routes
router.post('/:id/gallery', protect, uploadSingle, uploadGalleryImage);
router.delete('/:id/gallery/:imageId', protect, deleteGalleryImage);

export default router;
