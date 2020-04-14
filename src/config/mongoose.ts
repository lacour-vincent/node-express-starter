import mongoose from 'mongoose';

import { MONGODB_URI } from './config';

export const connectMongoDB = async (): Promise<typeof mongoose> => {
    try {
        const connection = await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        return connection;
    } catch (err) {
        console.error(`  MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    }
};
