import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import slugify from 'slugify';

const Realisation = sequelize.define('Realisation', {
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
        defaultValue: 'Industriel'
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surface: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    client: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.STRING
    },
    budget: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('completed', 'ongoing', 'planned'),
        defaultValue: 'completed'
    },
    mainImage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageAlt: {
        type: DataTypes.STRING
    },
    // Arrays stored as JSONB
    gallery: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    challenges: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    solutions: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    // SEO Fields
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
        beforeValidate: (realisation) => {
            if (realisation.title && !realisation.slug) {
                realisation.slug = slugify(realisation.title, { lower: true, strict: true });
            }
        }
    }
});

export default Realisation;
