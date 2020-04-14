import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { UserDocument } from '../../interfaces';

const COLLECTION_NAME = 'users';

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        profile: {
            name: String,
            location: String,
        },
    },
    { timestamps: true },
);

UserSchema.pre('save', async function (next) {
    const user = this as UserDocument;
    if (!user.isModified('password')) return next();
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
    const user = this as UserDocument;
    const isSame = await bcrypt.compare(password, user.password);
    return isSame;
};

export const UserModel = mongoose.model<UserDocument>(COLLECTION_NAME, UserSchema);
