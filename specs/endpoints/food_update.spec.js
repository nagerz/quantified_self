var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

describe('Food update api', () => {
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
      const body = {
                    "food":
                      {
                        "name": "Mint",
                        "calories": "14"
                      }
                    }

      const response = {
                        "id": 1,
                        "name": "Mint",
                        "calories": 14
                      }

      return request(app).patch("/api/v1/foods/2").then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toBe(response)
      });
    });

    // test('it should return a food object', () => {
    //   return request(app).get("/api/v1/foods/1").then(response => {
    //     expect(response.body.id).toBe(1),
    //     expect(response.body.name).toBe('Cheetos'),
    //     expect(response.body.calories).toBe(30)
    //   });
    // });
    //
    // test('it should return a 404 status when unsuccessful', () => {
    //   return request(app).get("/api/v1/foods/4").then(response => {
    //     expect(response.status).toBe(404)
    //     expect(response.body.error).toBe("Requested food item could not be found.")
    //   });
    // });
  });
});