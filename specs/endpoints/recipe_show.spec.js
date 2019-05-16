var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Recipe show API', () => {
  describe('Test GET /api/v1/recipes/:id path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/recipes/1").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return a food object', () => {
      return request(app).get("/api/v1/recipes/1").then(response => {
        expect(response.body.id).toBe(1),
        expect(response.body.name).toBe('Fancy Chicken Recipe'),
        expect(response.body.calories).toBe(1300)
        expect(response.body.url).toBe("chickenurl")
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/api/v1/recipes/999").then(response => {
        expect(response.status).toBe(404)
      });
    });

    test('it should return an error message when unsuccessful', () => {
      return request(app).get("/api/v1/recipes/999").then(response => {
        expect(response.body.error).toBe("Requested recipe could not be found.")
      });
    });
  });
});
