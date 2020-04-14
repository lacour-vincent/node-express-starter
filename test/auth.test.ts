import { UserModel } from './../src/models/user/user.model';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'supertest';

import { authRouter } from '../src/routes';
import { connectMongoDB } from '../src/config/mongoose';

const app = express();
app.use(bodyParser.json());
app.use(authRouter);
const server = request(app);

describe('ROUTE - /auth', () => {
    beforeAll(async () => {
        await connectMongoDB();
    });

    describe('POST - /sign-up', () => {
        it('should sign-up a user with email and password', async () => {
            const user = { email: 'test-auth@test.com', password: 'password' };
            const response = await server.post('/sign-up').send(user);
            expect(response.status).toBe(200);
            await UserModel.deleteOne({ email: user.email });
        });

        it('should return 422 - email format is incorrect', async () => {
            const user = { email: 'wrong-email', password: 'password' };
            const response = await server.post('/sign-up').send(user);
            expect(response.status).toBe(422);
        });

        it('should return 422 - password format is not strong enough', async () => {
            const user = { email: 'test-auth@test.com', password: '123' };
            const response = await server.post('/sign-up').send(user);
            expect(response.status).toBe(422);
        });

        it('should return 422 - email already exists', async () => {
            const user = { email: 'already-exists@test.com', password: 'password' };
            await server.post('/sign-up').send(user);
            const response = await server.post('/sign-up').send(user);
            expect(response.status).toBe(422);
            await UserModel.deleteOne({ email: user.email });
        });
    });

    describe('POST - /sign-in', () => {
        it('should sign-in a user with email and password', async () => {
            const user = { email: 'test-auth@test.com', password: 'password' };
            await UserModel.create(user);
            const { body, status } = await server.post('/sign-in').send(user);
            expect(status).toBe(200);
            expect(body.token).toBeDefined();
            await UserModel.deleteOne({ email: user.email });
        });

        it('should return 422 - email format is incorrect', async () => {
            const user = { email: 'wrong-email', password: 'password' };
            const response = await server.post('/sign-in').send(user);
            expect(response.status).toBe(422);
        });

        it('should return 401 - wrong email', async () => {
            const user = { email: 'test-auth@test.com', password: 'password' };
            await UserModel.create(user);
            const response = await server.post('/sign-in').send({ ...user, email: 'wrong-email@test.com' });
            expect(response.status).toBe(401);
            await UserModel.deleteOne({ email: user.email });
        });

        it('should return 401 - wrong password', async () => {
            const user = { email: 'test2@test.com', password: 'password' };
            await UserModel.create(user);
            const response = await server.post('/sign-in').send({ ...user, password: 'wrong-password' });
            expect(response.status).toBe(401);
            await UserModel.deleteOne({ email: user.email });
        });
    });
});
