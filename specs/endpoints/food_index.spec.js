var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Food index API', () => {
  describe('Test GET /api/v1/foods path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });
    
    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/foods").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return an array of food objects', () => {
      return request(app).get("/api/v1/foods").then(response => {
        expect(response.body).toBeInstanceOf(Array),
        expect(response.body.length).toEqual(8),
        expect(Object.keys(response.body[0])).toContain('name'),
        expect(Object.keys(response.body[0])).toContain('calories')
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/bad_path").then(response => {
        expect(response.statusCode).toBe(404)
      });
    });
  });
});
