var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Recipe index API', () => {
  describe('Test GET /api/v1/recipes path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/recipes").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return an array of recipe objects', () => {
      return request(app).get("/api/v1/recipes").then(response => {
        expect(response.body).toBeInstanceOf(Array),
        expect(response.body.length).toEqual(4),
        expect(Object.keys(response.body[0])).toContain('name'),
        expect(response.body[0].name).toBe('Fancy Chicken Recipe'),
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(response.body[0].calories).toBe(1300)
        expect(response.body[0].url).toBe('chickenurl')
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/bad_path").then(response => {
        expect(response.statusCode).toBe(404)
      });
    });
  });
});
