var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Food show API', () => {
  describe('Test GET /api/v1/users/:id path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status', () => {
      return request(app).get("/api/v1/users/1").then(response => {
        expect(response.status).toBe(200)
      });
    });

    test('it should return a user', () => {
      return request(app).get("/api/v1/users/1").then(response => {
        expect(response.body.id).toBe(1),
        expect(response.body.email).toBe('user1@email.com'),
        expect(response.body.api_key).toBe('user1_key')
      });
    });

    test('it should return a 404 status when unsuccessful', () => {
      return request(app).get("/api/v1/users/999").then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("User doesn't exist.")
      });
    });
  });
});
