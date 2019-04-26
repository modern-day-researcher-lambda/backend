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

describe('Category router handler', () => {
  beforeEach( async () => {
    const res = await request(server)
    .post('/users/login')
    .send({ username: 'username', password: 'password' });
    token = res.body.token;
  });

  afterEach( async () => {
    await db('category').delete();
  });

  describe('GET /', () => {
    it('responds with status code 200', async () => {
      await request(server)
        .post('/category/')
        .set('Authorization', token)
        .send({ title: 'Test Title' });
      const res = await request(server).get('/category');
      expect(res.status).toBe(200);
    });
  });

  describe(' GET /id', () => {
    it('responds with status code 200', async () => {
      await request(server)
        .post('/category/')
        .set('Authrization', token)
        .send({ title: 'Test Title' });
      const res = await request(server)
        .get('/category/1')
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('POST /', () => {
    it('responds with status code 201', async () => {
      const res = await request(server)
        .post('/category/')
        .set('Authorization', token)
        .send({ title: 'Test Title' });
      expect(res.status).toBe(201);
    });
  });

  describe('PUT /', () => {
    it('responds with status code 201', async () => {
      await request(server)
        .post('/category/')
        .set('Authorization', token)
        .send({ title: 'Test Title' });
      const res = await request(server)
        .put('/category/1')
        .set('Authorization', token)
        .send({ title: 'New Title' })
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /', () => {
    it('responds with status code 202', async () => {
      await request(server)
        .post('/category/')
        .set('Authorization', token)
        .send({ title: "Test Title" })
      const res = await request(server)
        .del('/category/1')
        .set('Authorization', token);
      expect(res.status).toBe(202);
    });
  });
});