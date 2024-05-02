//SUPERTEST-IntegrationTest
const request = require('supertest');
const app = require('../app');

describe('Integration Tests', () => {
  it('should return status 200 for GET /api/users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return status 404 for non-existing route', async () => {
    const res = await request(app).get('/api/non-existing-route');
    expect(res.status).toBe(404);
  });
});
