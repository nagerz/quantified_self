var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Meal delete API', () => {
  describe('Test DELETE /api/v1/meals/:meal_id/foods/:id', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 204 status', () => {
      return request(app).delete("/api/v1/meals/1/foods/1").then(response => {
        expect(response.status).toBe(204)
      })
    })

    test('it should be deleted from databse', () => {
      return request(app).get("/api/v1/meals/1/foods/1").then(response => {
        expect(response.status).toBe(404)
      })
    })

    test('it should return a 404 status', () => {
      return request(app).delete("/api/v1/meals/1/foods/10").then(response => {
        expect(response.status).toBe(404)
      })
    })

    test('it should return a 404 status', () => {
      return request(app).delete("/api/v1/meals/10/foods/1").then(response => {
        expect(response.status).toBe(404)
      })
    })
  })
})
