var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

describe('Meal delete API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterEach(() => {
  });

  describe('Test DELETE /api/v1/meals/:id', () => {
    test('it should return a 204 status', () => {
      return request(app).get("/api/v1/meals/1").then(response => {
        expect(response.status).toBe(200)
        expect(response.error).toBe("{error: 'The meal has been successfully deleted'}")
      })
    })

    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/meals/1").then(response => {
        expect(response.status).toBe(200)
        expect(response.error).toBe('')
      })
    })
  })
})
