import News from '../models/News.js';
import { Op } from 'sequelize';

// @desc    Get all public news
// @route   GET /api/news
// @access  Public
export const getNews = async (req, res) => {
    try {
        const { page = 1, limit = 9, category, featured } = req.query;
        const offset = (page - 1) * limit;

        const where = { status: 'published' };

        if (category && category !== 'Tous') {
            where.category = category;
        }

        if (featured === 'true') {
            where.featured = true;
        }

        const { count, rows } = await News.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['publishedAt', 'DESC']]
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

// @desc    Get single news by slug
// @route   GET /api/news/:slug
// @access  Public
export const getNewsBySlug = async (req, res) => {
    try {
        const article = await News.findOne({
            where: {
                slug: req.params.slug,
                status: 'published'
            }
        });

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article non trouvé'
            });
        }

        // Increment views
        await article.increment('views');

        res.json({
            success: true,
            data: article
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get related news
// @route   GET /api/news/:slug/related
// @access  Public
export const getRelatedNews = async (req, res) => {
    try {
        const currentArticle = await News.findOne({ where: { slug: req.params.slug } });

        if (!currentArticle) {
            return res.status(404).json({
                message: 'Article non trouvé'
            });
        }

        const related = await News.findAll({
            where: {
                category: currentArticle.category,
                slug: { [Op.ne]: req.params.slug },
                status: 'published'
            },
            limit: 3,
            order: [['publishedAt', 'DESC']]
        });

        res.json({
            success: true,
            data: related
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all news (Admin)
// @route   GET /api/news/admin/all
// @access  Private/Admin
export const getAllNews = async (req, res) => {
    try {
        const { page = 1, limit = 20, status, category, search } = req.query;
        const offset = (page - 1) * limit;

        const where = {};

        if (status) where.status = status;
        if (category) where.category = category;
        if (search) {
            where.title = { [Op.iLike]: `%${search}%` };
        }

        const { count, rows } = await News.findAndCountAll({
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

// @desc    Create news article
// @route   POST /api/news
// @access  Private/Admin
export const createNews = async (req, res) => {
    try {
        const articleData = { ...req.body };

        // Handle image upload from middleware
        if (req.file) {
            articleData.image = req.file.path;
        }

        // Set publishedAt if status is published
        if (articleData.status === 'published') {
            articleData.publishedAt = new Date();
        }

        // Parse SEO if it comes as string from FormData
        if (typeof articleData.seo === 'string') {
            try {
                articleData.seo = JSON.parse(articleData.seo);
            } catch (e) {
                // If parsing fails, use default or partial
            }
        }

        const article = await News.create(articleData);

        res.status(201).json({
            success: true,
            data: article
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update news article
// @route   PUT /api/news/:id
// @access  Private/Admin
export const updateNews = async (req, res) => {
    try {
        let article = await News.findByPk(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article non trouvé'
            });
        }

        const updateData = { ...req.body };

        // Handle image upload
        if (req.file) {
            updateData.image = req.file.path;
        }

        // Handle publishedAt
        if (updateData.status === 'published' && article.status !== 'published') {
            updateData.publishedAt = new Date();
        }

        // Parse SEO if it comes as string
        if (typeof updateData.seo === 'string') {
            try {
                updateData.seo = JSON.parse(updateData.seo);
            } catch (e) { }
        }

        await article.update(updateData);

        res.json({
            success: true,
            data: article
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete news article
// @route   DELETE /api/news/:id
// @access  Private/Admin
export const deleteNews = async (req, res) => {
    try {
        const article = await News.findByPk(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article non trouvé'
            });
        }

        await article.destroy();

        res.json({
            success: true,
            message: 'Article supprimé'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
