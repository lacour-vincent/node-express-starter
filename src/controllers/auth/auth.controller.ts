import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserModel } from '../../models';
import { TOKEN_EXPIRE_IN } from '../../config/passport';
import { SECRET_JWT } from '../../config/config';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        await UserModel.create({ email, password, profile: { name: '', location: '' } });
        return res.status(200).send('OK');
    } catch (err) {
        return next(err);
    }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).send('Unauthorized');
        const isPasswordCorrect = await user.isValidPassword(password);
        if (!isPasswordCorrect) return res.status(401).send('Unauthorized');
        const token = jwt.sign({ user: { id: user._id } }, SECRET_JWT, { expiresIn: TOKEN_EXPIRE_IN });
        return res.status(200).json({ token });
    } catch (err) {
        return next(err);
    }
};
