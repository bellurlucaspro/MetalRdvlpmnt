import Realisation from '../models/Realisation.js';
import { Op } from 'sequelize';

// @desc    Get all public realisations
// @route   GET /api/realisations
// @access  Public
export const getRealisations = async (req, res) => {
    try {
        const { page = 1, limit = 12, category, status } = req.query;
        const offset = (page - 1) * limit;

        const where = {};

        if (category && category !== 'Tous') {
            where.category = category;
        }

        if (status) {
            where.status = status;
        }

        const { count, rows } = await Realisation.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['year', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            total: count,
            page: parseInt(page),
            pages: Math.ceil(count / limit)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single realisation by slug
// @route   GET /api/realisations/:slug
// @access  Public
export const getRealisationBySlug = async (req, res) => {
    try {
        const realisation = await Realisation.findOne({
            where: { slug: req.params.slug }
        });

        if (!realisation) {
            return res.status(404).json({
                success: false,
                message: 'Réalisation non trouvée'
            });
        }

        res.json({
            success: true,
            data: realisation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all realisations (Admin)
// @route   GET /api/realisations/admin/all
// @access  Private/Admin
export const getAllRealisations = async (req, res) => {
    try {
        const { page = 1, limit = 20, status, category, search } = req.query;
        const offset = (page - 1) * limit;

        const where = {};
        if (status) where.status = status;
        if (category) where.category = category;
        if (search) {
            where.title = { [Op.iLike]: `%${search}%` };
        }

        const { count, rows } = await Realisation.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            total: count,
            page: parseInt(page),
            pages: Math.ceil(count / limit)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create realisation
// @route   POST /api/realisations
// @access  Private/Admin
export const createRealisation = async (req, res) => {
    try {
        const realisationData = { ...req.body };

        if (req.file) {
            realisationData.mainImage = req.file.path;
        }

        // Parse JSON fields if they come as string
        ['gallery', 'challenges', 'solutions', 'seo'].forEach(field => {
            if (typeof realisationData[field] === 'string') {
                try {
                    realisationData[field] = JSON.parse(realisationData[field]);
                } catch (e) { }
            }
        });

        const realisation = await Realisation.create(realisationData);

        res.status(201).json({
            success: true,
            data: realisation
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update realisation
// @route   PUT /api/realisations/:id
// @access  Private/Admin
export const updateRealisation = async (req, res) => {
    try {
        let realisation = await Realisation.findByPk(req.params.id);

        if (!realisation) {
            return res.status(404).json({
                success: false,
                message: 'Réalisation non trouvée'
            });
        }

        const updateData = { ...req.body };

        if (req.file) {
            updateData.mainImage = req.file.path;
        }

        // Parse JSON fields
        ['gallery', 'challenges', 'solutions', 'seo'].forEach(field => {
            if (typeof updateData[field] === 'string') {
                try {
                    updateData[field] = JSON.parse(updateData[field]);
                } catch (e) { }
            }
        });

        await realisation.update(updateData);

        res.json({
            success: true,
            data: realisation
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete realisation
// @route   DELETE /api/realisations/:id
// @access  Private/Admin
export const deleteRealisation = async (req, res) => {
    try {
        const realisation = await Realisation.findByPk(req.params.id);

        if (!realisation) {
            return res.status(404).json({
                success: false,
                message: 'Réalisation non trouvée'
            });
        }

        await realisation.destroy();

        res.json({
            success: true,
            message: 'Réalisation supprimée'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Upload gallery image
// @route   POST /api/realisations/:id/gallery
// @access  Private/Admin
export const uploadGalleryImage = async (req, res) => {
    try {
        const realisation = await Realisation.findByPk(req.params.id);

        if (!realisation) {
            return res.status(404).json({
                success: false,
                message: 'Réalisation non trouvée'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Aucune image fournie'
            });
        }

        const newImage = {
            url: req.file.path,
            alt: req.body.alt || realisation.title,
            caption: req.body.caption || ''
        };

        // Update gallery array
        const gallery = realisation.gallery || [];
        gallery.push(newImage);

        // Update with new array reference to trigger change detection
        await realisation.update({ gallery: [...gallery] });

        res.json({
            success: true,
            data: gallery
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete gallery image
// @route   DELETE /api/realisations/:id/gallery/:imageId
// @access  Private/Admin
export const deleteGalleryImage = async (req, res) => {
    // Note: With JSONB, imageId is a bit tricky if we didn't assign IDs.
    // For simplicity, we'll assume the frontend sends the URL or index.
    // Ideally, we should generate IDs for gallery items.

    // Implementation pending better gallery structure in frontend
    res.status(501).json({ message: "Not implemented yet for SQL" });
};
