import request from 'supertest';
import app from '../src/app';

const server = request(app);

describe('APP', () => {
    it('should return 200 with health-check', (done) => {
        return server.get('/health-check').expect(200).end(done);
    });

    it('should return 401 on auth route', (done) => {
        return server.get('/user').expect(401).end(done);
    });

    it('should return 404 with random url', (done) => {
        return server.get('/random-url').expect(404).end(done);
    });
});
