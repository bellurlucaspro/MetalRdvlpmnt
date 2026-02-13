import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import slugify from 'slugify';

const News = sequelize.define('News', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        unique: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Entreprise'
    },
    excerpt: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageAlt: {
        type: DataTypes.STRING
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM('published', 'draft', 'scheduled'),
        defaultValue: 'draft'
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    author: {
        type: DataTypes.STRING,
        defaultValue: 'METALR'
    },
    badge: {
        type: DataTypes.STRING
    },
    publishedAt: {
        type: DataTypes.DATE
    },
    // SEO Fields stored as JSON
    seo: {
        type: DataTypes.JSONB,
        defaultValue: {
            metaTitle: '',
            metaDescription: '',
            keywords: []
        }
    }
}, {
    timestamps: true,
    hooks: {
        beforeValidate: (article) => {
            if (article.title && !article.slug) {
                article.slug = slugify(article.title, { lower: true, strict: true });
            }
        }
    }
});

export default News;
