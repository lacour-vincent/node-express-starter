import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    console.error('.env file not found. Create .env file and set environment variables.');
    process.exit(1);
}

const getMongoDBURI = () => {
    if (process.env.NODE_ENV === 'prod') return process.env['MONGODB_URI_PROD'];
    if (process.env.NODE_ENV === 'test') return process.env['MONGODB_URI_TEST'];
    return process.env['MONGODB_URI_DEV'];
};

export const ENVIRONMENT = process.env.NODE_ENV;

export const PORT = process.env['PORT'];
export const SECRET_JWT = process.env['SECRET_JWT'];
export const MONGODB_URI = getMongoDBURI();

if (!MONGODB_URI) {
    console.error('No mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
}
