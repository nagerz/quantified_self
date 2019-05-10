var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var Meal = require('../../models').Meal;
var MealFood = require('../../models').MealFood;

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

  describe('Test DELETE /api/v1/meals/:meal_id/foods/:id', () => {
    test('it should return a 204 status', () => {
      // Meals.findAll(include: [{model: Food}])
      // .then(meals => {
      //
      // })

      return request(app).delete("/api/v1/meals/1/foods/1").then(response => {
        expect(response.status).toBe(204)
        // Meals.findAll(include: [{model: Food}]).count
        // .then(meals => {
        //
        // })
      })
    })

    // test('it should return a 404 status', () => {
    //   return request(app).delete("/api/v1/meals/1/foods/1").then(response => {
    //     expect(response.status).toBe(404)
    //   })
    // })
  })
})
