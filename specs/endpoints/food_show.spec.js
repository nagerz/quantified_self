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
    shell.exec('npx sequelize db:seed:undo:all')
  });

  describe('Test GET /api/v1/foods/:id path', () => {
    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/foods/1").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return a food object', () => {
      return request(app).get("/api/v1/foods/1").then(response => {
        expect(Object.keys(response.body[0].id)).toBe(1),
        expect(Object.keys(response.body[0].name)).toBe('Cheetos'),
        expect(Object.keys(response.body[0].calories)).toBe(30)
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/api/v1/foods/4").then(response => {
        expect(response.status).toBe(404)
        expect(response.body).toBe({ error: "Requested food item could not be found." })
      });
    });
  });
});
