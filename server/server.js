import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import config
import { connectDB } from './config/database.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import newsRoutes from './routes/news.routes.js';
import realisationsRoutes from './routes/realisations.routes.js';

// Import utilities
import { generateSitemap, generateRobotsTxt } from './utils/sitemap.js';

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Connect to PostgreSQL
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Trop de requêtes, veuillez réessayer plus tard'
});

app.use('/api', limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/realisations', realisationsRoutes);

// Serve sitemap and robots.txt
app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
        res.type('application/xml');
        res.sendFile(sitemapPath);
    } else {
        res.status(404).send('Sitemap not found');
    }
});

app.get('/robots.txt', (req, res) => {
    const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
        res.type('text/plain');
        res.sendFile(robotsPath);
    } else {
        res.status(404).send('robots.txt not found');
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Generate sitemap on startup
const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
setTimeout(async () => {
    try {
        await generateSitemap(baseUrl);
        generateRobotsTxt(baseUrl);
    } catch (error) {
        console.error('Error generating sitemap on startup:', error);
    }
}, 5000); // Wait 5 seconds for DB connection

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Erreur serveur',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║   🚀 METALR Backend Server Running   ║
╠═══════════════════════════════════════╣
║   Port: ${PORT}                       
║   Environment: ${process.env.NODE_ENV || 'development'}
║   Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}
╚═══════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    // Close server & exit process
    process.exit(1);
});
