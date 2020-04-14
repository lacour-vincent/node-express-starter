import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UserModel } from '../models';
import { SECRET_JWT } from './config';

export const TOKEN_EXPIRE_IN = '1h';

export interface AuthToken {
    user: { id: string };
    iat: number;
    exp: number;
}

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_JWT,
};

const jwtLogin = new Strategy(options, async (token: AuthToken, done: any) => {
    try {
        const user = await UserModel.findById(token.user.id);
        if (!user) return done(null, false);
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
});

passport.use(jwtLogin);

export default passport;
