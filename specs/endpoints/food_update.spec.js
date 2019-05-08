var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

describe('Food update api', () => {
  // beforeEach(() => {
  //   shell.exec('npx sequelize db:migrate:undo:all');
  //   shell.exec('npx sequelize db:seed:undo:all');
  //   shell.exec('npx sequelize db:create');
  //   shell.exec('npx sequelize db:migrate');
  //   shell.exec('npx sequelize db:seed:all');
  // })
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

  describe('Test PATCH /api/v1/foods/:id path', () => {
    test('it should return a 200 status', () => {
      const body = {
                    "food":
                      {
                        "name": "Mint",
                        "calories": 14
                      }
                    }

      const expected = {
                        "id": 1,
                        "name": "Mint",
                        "calories": 14
                      }

      return request(app).patch("/api/v1/foods/1").send(body).then(async response => {
        await expect(response.status).toBe(200)
        await expect(response.body).toBe(expected)
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
