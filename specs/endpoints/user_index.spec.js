var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('User index API', () => {
  describe('Test GET /api/v1/users path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/users").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return an array of users', () => {
      return request(app).get("/api/v1/users").then(response => {
        expect(response.body).toBeInstanceOf(Array),
        expect(response.body.length).toEqual(3),
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('email')
        expect(Object.keys(response.body[0])).toContain('api_key')
        expect(Object.keys(response.body[0])).toContain('password_digest')
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/bad_path").then(response => {
        expect(response.statusCode).toBe(404)
      });
    });
  });
});
