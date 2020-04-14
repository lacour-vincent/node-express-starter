import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../../controllers';
import { validate, UserValidator } from '../../validators';

export const USER_ROUTES = {
    ROOT: '/',
    PROFILE: '/profile',
    EMAIL: '/email',
    PASSWORD: '/password',
} as const;

export const router = express.Router({ strict: true });

router.get(USER_ROUTES.ROOT, async (req: Request, res: Response, next: NextFunction) => {
    await UserController.getUser(req, res, next);
});

router.patch(USER_ROUTES.PROFILE, validate(UserValidator.updateProfile), async (req: Request, res: Response, next: NextFunction) => {
    await UserController.updateProfile(req, res, next);
});

router.patch(USER_ROUTES.EMAIL, validate(UserValidator.updateEmail), async (req: Request, res: Response, next: NextFunction) => {
    await UserController.updateEmail(req, res, next);
});

router.patch(USER_ROUTES.PASSWORD, validate(UserValidator.updatePassword), async (req: Request, res: Response, next: NextFunction) => {
    await UserController.updatePassword(req, res, next);
});
