var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

describe('Meal index API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterEach(() => {});

  describe('Test GET /api/v1/meals', () => {
    test('it should return a 200 status', () => {
      return request(app).get('/api/v1/meals').then(response => {
        expect(response.status).toBe(200)
        expect(response.body[0]).toHaveProperty('id')
        expect(response.body[0]).toHaveProperty('name')
        expect(response.body[0]).toHaveProperty('Food')
        expect(response.body[0].Food[0]).toHaveProperty('id')
        expect(response.body[0].Food[0]).toHaveProperty('name')
        expect(response.body[0].Food[0]).toHaveProperty('calories')
      })
    })
  })
})
