var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

describe('Food show api', () => {
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

  describe('Test GET /api/v1/foods/:id path', () => {
    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/foods/1").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return a food object', () => {
      return request(app).get("/api/v1/foods/1").then(response => {
        expect(response.body.id).toBe(1),
        expect(response.body.name).toBe('Cheetos'),
        expect(response.body.calories).toBe(30)
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/api/v1/foods/4").then(response => {
        expect(response.status).toBe(404)
      });
    });

    test('it should return an error message when unsuccessful', () => {
      return request(app).get("/api/v1/foods/4").then(response => {
        expect(response.body.error).toBe("Requested food item could not be found.")
      });
    });
  });
});
