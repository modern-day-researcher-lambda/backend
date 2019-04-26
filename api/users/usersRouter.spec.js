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
});