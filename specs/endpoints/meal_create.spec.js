var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Meal = require('../../models').Meal;

describe('Meal create API', () => {
  describe('Test POST /api/v1/meals', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 201 status and meal object', () => {
      const body = {
                    "api_key": "user1_key",
                    "name": "New meal",
                    "date": "05-10-19"
                  }

      return request(app).post("/api/v1/meals").send(body).then(response => {
        expect(response.status).toBe(201)
        expect(response.body.id).toBe(8),
        expect(response.body.name).toBe('New meal'),
        expect(response.body.date).toBe("2019-05-10T06:00:00.000Z")
        expect(response.body.UserId).toBe(1)
      });
    });

    test('it should return a 400 status with error message when missing api key', () => {
      const body = {
                    "name": "New meal",
                    "date": "05-10-19"
                  }

      return request(app).post("/api/v1/meals/").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("unauthorized")
      });
    });

    test('it should return a 400 status with error message with bad api key', () => {
      const body = {
                    "api_key": "bad_key",
                    "name": "New meal",
                    "date": "05-10-19"
                  }

      return request(app).post("/api/v1/meals/").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("unauthorized")
      });
    });

    test('it should return a 400 status with error message with no name', () => {
      const body = {
                    "api_key": "bad_key",
                    "date": "05-10-19"
                  }

      return request(app).post("/api/v1/meals/").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("Missing name and/or date.")
      });
    });

    test('it should return a 400 status with error message with no date', () => {
      const body = {
                    "api_key": "bad_key",
                    "name": "New meal"
                  }

      return request(app).post("/api/v1/meals/").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("Missing name and/or date.")
      });
    });

    test('it should return a 400 status with error message if meal already exists', () => {
      const body = {
                    "api_key": "user1_key",
                    "name": "New meal",
                    "date": "05-10-19"
                  }

      return request(app).post("/api/v1/meals/").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("That meal already exists for that user.")
      });
    });
  });
});
