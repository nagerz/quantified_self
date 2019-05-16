var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Meal = require('../../models').Meal;

describe('Add a Food to a Meal API', () => {
  describe('Test POST /api/v1/meals/:meal_id/foods/:food_id', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 201 status and success message', () => {
      const body = {
                    "api_key": "user1_key"
                  }

      return request(app).post("/api/v1/meals/1/foods/4").send(body).then(response => {
        expect(response.status).toBe(201)
        expect(response.body.message).toBe("Successfully added hamburger to Monday Breakfast")
      });
    });

    test('it should return a 400 status with error message when missing api key', () => {
      const body = {}

      return request(app).post("/api/v1/meals/1/foods/4").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("unauthorized")
      });
    });

    test('it should return a 400 status with error message with bad api key', () => {
      const body = {
                    "api_key": "bad_key"
                  }

      return request(app).post("/api/v1/meals/1/foods/4").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("unauthorized")
      });
    });

    test('it should return a 400 status with bad meal id', () => {
      const body = {
                    "api_key": "user1_key",
                  }

      return request(app).post("/api/v1/meals/10/foods/4").send(body).then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("No meal with that ID.")
      });
    });

    test('it should return a 400 status with bad food id', () => {
      const body = {
                    "api_key": "user1_key",
                  }

      return request(app).post("/api/v1/meals/1/foods/40").send(body).then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("No food with that ID.")
      });
    });

    test('it should return a 400 status with error message if meal already has food item', () => {
      const body = {
                    "api_key": "user1_key"
                  }

      return request(app).post("/api/v1/meals/1/foods/1").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("That food already exists for that meal.")
      });
    });
  });
});
