var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Food show API', () => {
  describe('Test GET /api/v1/foods/:id path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/foods/1").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return a food object', () => {
      return request(app).get("/api/v1/foods/1").then(response => {
        expect(response.body.id).toBe(1),
        expect(response.body.name).toBe('cheetos'),
        expect(response.body.calories).toBe(300)
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/api/v1/foods/999").then(response => {
        expect(response.status).toBe(404)
      });
    });

    test('it should return an error message when unsuccessful', () => {
      return request(app).get("/api/v1/foods/999").then(response => {
        expect(response.body.error).toBe("Requested food item could not be found.")
      });
    });
  });
});
