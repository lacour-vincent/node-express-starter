import express, { Request, Response, NextFunction } from 'express';
import { AuthController } from '../../controllers';
import { validate, AuthValidator } from '../../validators';

export const AUTH_ROUTES = {
    ROOT: '/',
    SIGN_UP: '/sign-up',
    SIGN_IN: '/sign-in',
} as const;

export const router = express.Router({ strict: true });

router.post(AUTH_ROUTES.SIGN_UP, validate(AuthValidator.signUp), async (req: Request, res: Response, next: NextFunction) => {
    await AuthController.signUp(req, res, next);
});

router.post(AUTH_ROUTES.SIGN_IN, validate(AuthValidator.signIn), async (req: Request, res: Response, next: NextFunction) => {
    await AuthController.signIn(req, res, next);
});
