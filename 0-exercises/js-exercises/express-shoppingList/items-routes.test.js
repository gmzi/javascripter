process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./index');
let items = require('./fakeDb');
const { post } = require('./index');
const { expect } = require('@jest/globals');

let milk = { name: 'milko', price: 1.23 };

beforeEach(function () {
  items.length = 0;
  items.push(milk);
});

// afterEach(function () {
//   items.length = 0;
// });

describe('GET /items', function () {
  test('Gets all items', async function () {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: 'milko', price: 1.23 }]);
  });
});

describe('POST /items', function () {
  test('Adds item to list', async function () {
    const res = await request(app)
      .post('/items')
      .send({ name: 'newsy', price: 2.34 });
    expect(res.body).toEqual({
      added: {
        name: 'newsy',
        price: 2.34,
      },
    });
  });
});
