var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Meal = require('../../models').Meal;

describe('Meal show API', () => {
  describe('Test GET /api/v1/meals/:id/foods path', () => {
    beforeEach(() => {
      specHelper.testSetup()
    });
    afterEach(() => {
      specHelper.tearDown()
    });

    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/meals/1/foods").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return a meal object', () => {
      return request(app).get("/api/v1/meals/1/foods").then(response => {
        expect(response.body.id).toBe(1),
        expect(response.body.name).toBe('Breakfast'),
        expect(response.body.Food[0].name).toBe("cheetos")
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/api/v1/meals/100/foods").then(response => {
        expect(response.status).toBe(404)
      });
    });

    test('it should return an error message when unsuccessful', () => {
      return request(app).get("/api/v1/meals/100/foods").then(response => {
        expect(response.body.error).toBe("Requested meal could not be found.")
      });
    });
  });
});
