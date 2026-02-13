import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/metalr', {
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    }
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Connected');

        // Sync models - use { force: true } only for development to reset tables
        // await sequelize.sync({ alter: true }); 
        await sequelize.sync();
        console.log('✅ Database Synced');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
};

export default sequelize;
