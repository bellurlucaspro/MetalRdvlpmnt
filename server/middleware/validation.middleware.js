import { body, validationResult } from 'express-validator';

// Middleware to check validation results
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

// Validation rules for News
export const newsValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Le titre est requis')
        .isLength({ max: 200 }).withMessage('Le titre ne peut pas dépasser 200 caractères'),

    body('category')
        .notEmpty().withMessage('La catégorie est requise')
        .isIn(['Entreprise', 'Innovation', 'Projet', 'Événement'])
        .withMessage('Catégorie invalide'),

    body('excerpt')
        .trim()
        .notEmpty().withMessage('L\'extrait est requis')
        .isLength({ max: 300 }).withMessage('L\'extrait ne peut pas dépasser 300 caractères'),

    body('content')
        .notEmpty().withMessage('Le contenu est requis'),

    body('imageAlt')
        .trim()
        .notEmpty().withMessage('Le texte alternatif est requis')
        .isLength({ max: 150 }).withMessage('Le texte alternatif ne peut pas dépasser 150 caractères'),

    body('status')
        .optional()
        .isIn(['published', 'draft', 'scheduled'])
        .withMessage('Statut invalide'),

    body('seo.metaTitle')
        .optional()
        .isLength({ max: 60 }).withMessage('Le meta titre ne peut pas dépasser 60 caractères'),

    body('seo.metaDescription')
        .optional()
        .isLength({ max: 160 }).withMessage('La meta description ne peut pas dépasser 160 caractères')
];

// Validation rules for Realisation
export const realisationValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Le titre est requis')
        .isLength({ max: 200 }).withMessage('Le titre ne peut pas dépasser 200 caractères'),

    body('category')
        .notEmpty().withMessage('La catégorie est requise')
        .isIn(['Agriculture', 'Photovoltaïque', 'Industriel', 'Ouvrages d\'art'])
        .withMessage('Catégorie invalide'),

    body('location')
        .trim()
        .notEmpty().withMessage('La localisation est requise'),

    body('year')
        .notEmpty().withMessage('L\'année est requise'),

    body('surface')
        .trim()
        .notEmpty().withMessage('La surface est requise'),

    body('description')
        .notEmpty().withMessage('La description est requise'),

    body('imageAlt')
        .trim()
        .notEmpty().withMessage('Le texte alternatif est requis')
        .isLength({ max: 150 }).withMessage('Le texte alternatif ne peut pas dépasser 150 caractères'),

    body('status')
        .optional()
        .isIn(['completed', 'ongoing', 'planned'])
        .withMessage('Statut invalide')
];

// Validation rules for login
export const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('Email invalide'),

    body('password')
        .notEmpty().withMessage('Le mot de passe est requis')
];
