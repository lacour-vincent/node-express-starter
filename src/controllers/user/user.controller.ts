import { Request, Response, NextFunction } from 'express';

import { UserDocument } from '../../interfaces';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, profile } = req.user as UserDocument;
        const response = { email, profile };
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as UserDocument;
        const { profile } = req.body;
        user.profile = { ...user.profile, ...profile };
        await user.save();
        return res.status(200).send('OK');
    } catch (err) {
        return next(err);
    }
};

export const updateEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as UserDocument;
        const { email } = req.body;
        user.email = email;
        await user.save();
        return res.status(200).send('OK');
    } catch (err) {
        return next(err);
    }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as UserDocument;
        const { newPassword } = req.body;
        user.password = newPassword;
        await user.save();
        return res.status(200).send('OK');
    } catch (err) {
        return next(err);
    }
};
