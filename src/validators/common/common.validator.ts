import { Request, Response, NextFunction } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator';

import { UserModel } from '../../models';
import { UserDocument } from '../../interfaces';

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const err = validationResult(req);
        if (err.isEmpty()) return next();
        return res.status(422).json({ message: 'unprocessable_entity', errors: err.array() });
    };
};

export const isEmail = (key: string, message: string): ValidationChain => check(key, message).isEmail();
export const isPassword = (key: string, message: string): ValidationChain => check(key, message).isLength({ min: 4 });

export const isEmailExists = (key: string, message: string): ValidationChain =>
    check(key).custom(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) return Promise.reject(message);
    });

export const isValidPassword = (key: string, message: string): ValidationChain =>
    check(key).custom(async (password, { req }) => {
        const user = req.user as UserDocument;
        const isValid = await user.isValidPassword(password);
        if (!isValid) return Promise.reject(message);
    });
