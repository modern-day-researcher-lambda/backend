const request = require('supertest');
const server = require('../../index.js');
const db = require('../../data/dbConfig.js');

describe('Users route handling', () => {
  beforeEach( async () => await db('users').truncate());

  describe('GET /', () => {
    it('responds with status code 200', async () => {
      const res = await request(server).get('/users');
      expect(res.status).toBe(200);
    });

    it('responds with json',  async () => {
      const res = await request(server).get('/users');
      expect(res.type).toMatch(/json/i);
    });

    it('if empty sends an empty array', async () => {
      const res = await request(server).get('/users');
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /users/register', () => {
    it('responds with status code 201', async () => {
      const res = await request(server)
        .post('/users/register')
        .send({ username: 'user2', password: 'pass2'});
      expect(res.status).toBe(201);
    });

    it('responds with status code 422 when body missing', async () => {
      const res = await request(server)
        .post('/users/register');
      expect(res.status).toBe(422);
    });

    it('responds with a token', async () => {
      const res = await request(server)
        .post('/users/register')
        .send({ username: 'user2', password: 'pass2'});
      expect(res.body.token).toBeDefined();
    });
  });
});