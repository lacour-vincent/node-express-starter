import { UserModel } from './../src/models/user/user.model';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import passport from '../src/config/passport';

import { authRouter, userRouter } from '../src/routes';
import { connectMongoDB } from '../src/config/mongoose';
import { SECRET_JWT } from './../src/config/config';

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/auth', authRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
const server = request(app);

describe('ROUTE - /user', () => {
    let userId: string;
    let token: string;

    beforeAll(async () => {
        await connectMongoDB();
        const user = await UserModel.create({ email: 'test-user@test.com', password: 'password', profile: {} });
        userId = user.id;
        token = jwt.sign({ user: { id: user.id } }, SECRET_JWT, { expiresIn: '10s' });
    });

    afterAll(async () => {
        await UserModel.deleteOne({ _id: userId });
    });

    describe('GET  - /', () => {
        it('should return user document', async () => {
            const { body, status } = await server.get('/user').set('Authorization', `Bearer ${token}`);
            const { email } = await UserModel.findById(userId);
            expect(status).toBe(200);
            expect(body.email).toBe(email);
            expect(body.profile).toEqual({});
        });

        it('should return 401 with wrong token', async () => {
            const token = 'fake-token';
            const { status } = await server.get('/user').set('Authorization', `Bearer ${token}`);
            expect(status).toBe(401);
        });
    });

    describe('PATCH  - /profile', () => {
        it('should patch the profile of the user', async () => {
            const body = { profile: { name: 'firstname lastname', location: 'Paris' } };
            const { status } = await server.patch('/user/profile').set('Authorization', `Bearer ${token}`).send(body);
            const { profile } = await UserModel.findById(userId);
            const { name, location } = profile;
            expect(status).toBe(200);
            expect(name).toEqual(body.profile.name);
            expect(location).toEqual(body.profile.location);
        });

        it('should return 422 - name is incorrect', async () => {
            const body = { profile: { name: 42, location: 'Paris' } };
            const { status } = await server.patch('/user/profile').set('Authorization', `Bearer ${token}`).send(body);
            expect(status).toBe(422);
        });

        it('should return 422 - location is incorrect', async () => {
            const body = { profile: { name: 'firstname lastname', location: 42 } };
            const { status } = await server.patch('/user/profile').set('Authorization', `Bearer ${token}`).send(body);
            expect(status).toBe(422);
        });

        it('should return 401 - wrong token', async () => {
            const body = { profile: { name: 'firstname lastname', location: 'Paris' } };
            const { status } = await server.patch('/user/profile').set('Authorization', 'Bearer fake-token').send(body);
            expect(status).toBe(401);
        });
    });

    describe('PATCH  - /email', () => {
        it('should patch the email of the user', async () => {
            const { id, email } = await UserModel.create({ email: 'test-user-email@test.com', password: 'password', profile: {} });
            const userToken = jwt.sign({ user: { id } }, SECRET_JWT, { expiresIn: '10s' });
            const body = { email: 'test-user-email-updated@test.com' };
            const { status } = await server.patch('/user/email').set('Authorization', `Bearer ${userToken}`).send(body);
            const { email: newEmail } = await UserModel.findById(userId);
            expect(status).toBe(200);
            expect(email).not.toBe(newEmail);
            await UserModel.deleteOne({ _id: id });
        });

        it('should return 422 - email is incorrect', async () => {
            const body = { email: 'wrong-email' };
            const { status } = await server.patch('/user/email').set('Authorization', `Bearer ${token}`).send(body);
            expect(status).toBe(422);
        });

        it('should return 401 - wrong token', async () => {
            const body = { email: 'test-user-updated@test.com' };
            const { status } = await server.patch('/user/email').set('Authorization', 'Bearer fake-token').send(body);
            expect(status).toBe(401);
        });
    });

    describe('PATCH  - /password', () => {
        it('should patch the password of the user', async () => {
            const { id, password } = await UserModel.create({ email: 'test-user-password@test.com', password: 'password', profile: {} });
            const userToken = jwt.sign({ user: { id } }, SECRET_JWT, { expiresIn: '10s' });
            const body = { password: 'password', newPassword: 'new-password' };
            const { status } = await server.patch('/user/password').set('Authorization', `Bearer ${userToken}`).send(body);
            const { password: newPassword } = await UserModel.findById(userId);
            expect(status).toBe(200);
            expect(password).not.toBe(newPassword);
            await UserModel.deleteOne({ _id: id });
        });

        it('should return 422 - password format is incorrect', async () => {
            const body = { password: 'wrong-password', newPassword: 'new-password' };
            const { status } = await server.patch('/user/password').set('Authorization', `Bearer ${token}`).send(body);
            expect(status).toBe(422);
        });

        it('should return 422 - wrong password', async () => {
            const body = { password: 'password', newPassword: '123' };
            const { status } = await server.patch('/user/password').set('Authorization', `Bearer ${token}`).send(body);
            expect(status).toBe(422);
        });

        it('should return 401 - wrong token', async () => {
            const body = { password: 'password', newPassword: 'new-password' };
            const { status } = await server.patch('/user/password').set('Authorization', 'Bearer fake-token').send(body);
            expect(status).toBe(401);
        });
    });
});
