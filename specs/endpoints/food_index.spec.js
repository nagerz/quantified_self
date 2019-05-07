var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

describe('Food api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test GET /api/v1/foods path', () => {
    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/foods").then(response => {
        expect(response.statusCode).toBe(200)
      });
    });
  });
});
