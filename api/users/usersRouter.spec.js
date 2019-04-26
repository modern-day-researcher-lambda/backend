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

  describe('POST /users/login', () => {
    beforeEach(async () => {
      await request(server)
        .post('/users/register')
        .send({username: 'username', password: 'password'});
    });

    it('responds with status code 201', async () => {
      const res = await request(server)
        .post('/users/login')
        .send({ username: 'username', password: 'password' });
      expect(res.status).toBe(201);
    });

    it('responds with status code 422 when body missing', async () => {
      const res = await request(server)
        .post('/users/login')
        .send({ username: 'username' });
      expect(res.status).toBe(422);
    });

    it('responds with status code 401 when username is wrong', async () => {
      const res = await request(server)
        .post('/users/login')
        .send({username: 'wrong', password: 'password '});
      expect(res.status).toBe(401);
    });

    it('responds with status code 4o1 when password is wrong', async () => {
      const res = await request(server)
        .post('/users/login')
        .send({ username: 'username', password: 'wrong' });
      expect(res.status).toBe(401);
    });

    it('sends a token', async () => {
      const res = await request(server)
        .post('/users/login')
        .send({ username: 'username', password: 'password' });
        expect(res.body.token).toBeDefined();
    });
  });
});