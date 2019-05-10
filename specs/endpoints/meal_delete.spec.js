var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Meal delete API', () => {
  describe('Test DELETE /api/v1/meals/:meal_id/foods/:id', () => {
    beforeEach(() => {
      specHelper.testSetup()
    });
    afterEach(() => {
      specHelper.tearDown()
    });

    test.skip('it should return a 204 status', () => {
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
