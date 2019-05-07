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
    shell.exec('npx sequelize db:seed:undo:all')
  });

  describe('Test GET /api/v1/foods path', () => {
    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/foods").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return an array of food objects', () => {
      return request(app).get("/api/v1/foods").then(response => {
        expect(response.body).toBeInstanceOf(Array),
        expect(response.body.length).toEqual(3),
        expect(Object.keys(response.body[0])).toContain('name'),
        expect(Object.keys(response.body[0])).toContain('calories')
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/bad_path").then(response => {
        expect(response.statusCode).toBe(404)
      });
    });
  });
});
