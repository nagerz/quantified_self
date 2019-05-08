var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

describe('Food show api', () => {
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

  describe('Test GET /api/v1/foods/:id path', () => {
    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/foods/1").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return a food object', async () => {
      await request(app).get("/api/v1/foods/1").then(async response => {
        await expect(response.body.id).toBe(1),
        await expect(response.body.name).toBe('Cheetos'),
        await expect(response.body.calories).toBe(30)
      });
    });

    test('it should return a 404 status when unsuccessful', async () => {
      await request(app).get("/api/v1/foods/4").then(async response => {
        await expect(response.status).toBe(404)
        await expect(response.body.error).toBe("Requested food item could not be found.")
      });
    });
  });
});
