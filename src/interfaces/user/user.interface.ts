import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    profile: {
        name: string;
        location: string;
    };
    isValidPassword: (password: string) => Promise<boolean>;
}
