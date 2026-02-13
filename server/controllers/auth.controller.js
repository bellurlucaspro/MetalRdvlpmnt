import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ where: { email } });

        if (user && (await user.matchPassword(password))) {
            // Update last login
            user.lastLogin = new Date();
            await user.save();

            res.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (user) {
            res.json({
                success: true,
                user
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Verify token
// @route   GET /api/auth/verify
// @access  Private
export const verifyToken = async (req, res) => {
    res.json({ success: true, user: req.user });
};

// @desc    Initialize admin user (only if no users exist)
// @route   POST /api/auth/init
// @access  Public
export const initAdmin = async (req, res) => {
    try {
        const count = await User.count();
        if (count > 0) {
            return res.status(400).json({
                success: false,
                message: 'Admin already initialized'
            });
        }

        const { email, password } = process.env;
        const adminEmail = email || process.env.ADMIN_EMAIL || 'admin@metalr.com';
        const adminPassword = password || process.env.ADMIN_PASSWORD || 'Admin123!';

        const user = await User.create({
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
        });

        res.status(201).json({
            success: true,
            message: 'Admin user created',
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
