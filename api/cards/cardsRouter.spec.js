const request = require('supertest');
const server = require('../../index.js');
const db = require('../../data/dbConfig.js');

let token;
beforeAll(async () => {
  const res = await request(server)
      .post('/users/register')
      .send({ 
          username: 'username',
          password: 'password'
      });
});

describe('Cards route handler', () => {
  beforeEach( async () => {
    const res = await request(server)
    .post('/users/login')
    .send({ username: 'username', password: 'password' });
    token = res.body.token;
  });

  afterEach( async () => await db('cards').delete());

  describe('GET /cards/user/1', () => {
    beforeEach( async () => {
      await request(server)
        .post('/cards/users')
        .set('Authorization', token)
        .send({
          "title": "Title",
          "description": "Description",
          "category": "All",
          "link": "www.google.com",
          "completed": 0,
          "created": "",
          "updated": "",
          "user_id": 1
        });
    });

    it('responds with status code 200', async () => {
      const res = await request(server)
        .get('/cards/users/1')
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('GET /cards/1', () => {
    it('responds with status code 200', async () => {
      const res = await request(server)
        .get('/cards/1')
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('POST /cards/users', () => {
    it('responds with status code 201', async () => {
      const res = await request(server)
        .post('/cards/users')
        .set('Authorization', token)
        .send({
          "title": "New Title",
          "description": "New Description",
          "category": "All",
          "link": "www.google.com",
          "completed": 0,
          "created": "",
          "updated": "",
          "user_id": 1
        });
      expect(res.status).toBe(201);
    });
  });

  describe('DELETE /cards/:id', () => {
    it('responds with status code 202', async () => {
      const res = await request(server)
        .del('/cards/1')
        .set('Authorization', token);
      expect(res.status).toBe(202);
    });
  });

  describe('PUT /cards/:id', () => {
    it('responds with status code 202', async () => {
      const res = await request(server)
        .put('/cards/1')
        .set('Authorization', token)
        .send({
          "title": "updated",
          "description": "updated",
          "category": "All",
          "link": "www.google.com",
          "completed": 0,
          "created": "",
          "updated": "",
          "user_id": 1
        });
      expect(res.status).toBe(202);
    });
  });
});