import express, { Request, Response } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import passport from './config/passport';
import { PORT } from './config/config';
import { authRouter, userRouter } from './routes';

const app = express();

app.set('port', PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(helmet());
app.use(cors());

app.use('/health-check', (_req: Request, res: Response) => res.status(200).send('OK'));
app.use('/auth', authRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);

app.use('*', (_req: Request, res: Response) => res.status(404).send('Not found'));

export default app;
