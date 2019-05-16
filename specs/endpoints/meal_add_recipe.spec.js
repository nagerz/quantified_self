var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Meal = require('../../models').Meal;

describe('Add a Recipe to a Meal API', () => {
  describe('Test POST /api/v1/meals/:meal_id/recipes', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 201 status and success message', () => {
      const body = {
                    "api_key": "user1_key",
                    "recipe": {
                      "name": "Test Recipe",
                      "calories": 10,
                      "url": "testurl"
                    }
                  }

      return request(app).post("/api/v1/meals/1/recipes").send(body).then(response => {
        expect(response.status).toBe(201)
        expect(response.body.message).toBe("Successfully added Test Recipe to Monday Breakfast")
      });
    });

    test('it should return a 400 status with error message when missing api key', () => {
      const body = {
                    "recipe": {
                      "name": "Test Recipe",
                      "calories": 10,
                      "url": "testurl"
                    }
                  }

      return request(app).post("/api/v1/meals/1/recipes").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("unauthorized")
      });
    });

    test('it should return a 400 status with error message with bad api key', () => {
      const body = {
                    "api_key": "bad_key",
                    "recipe": {
                      "name": "Test Recipe",
                      "calories": 10,
                      "url": "testurl"
                    }
                  }

      return request(app).post("/api/v1/meals/1/recipes").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("unauthorized")
      });
    });

    test('it should return a 400 status with bad meal id', () => {
      const body = {
                    "api_key": "user1_key",
                    "recipe": {
                      "name": "Test Recipe",
                      "calories": 10,
                      "url": "testurl"
                    }
                  }

      return request(app).post("/api/v1/meals/10/recipes").send(body).then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("No meal with that ID.")
      });
    });

    test('it should return a 400 status with no recipe name', () => {
      const body = {
                    "api_key": "user1_key",
                    "recipe": {
                      "calories": 10,
                      "url": "testurl"
                    }
                  }

      return request(app).post("/api/v1/meals/1/recipes").send(body).then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Missing/incorrectly formatted recipe information.")
      });
    });

    test('it should return a 400 status with no recipe calories', () => {
      const body = {
                    "api_key": "user1_key",
                    "recipe": {
                      "name": "Test Recipe",
                      "url": "testurl"
                    }
                  }

      return request(app).post("/api/v1/meals/1/recipes").send(body).then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Missing/incorrectly formatted recipe information.")
      });
    });

    test('it should return a 400 status with no recipe url', () => {
      const body = {
                    "api_key": "user1_key",
                    "recipe": {
                      "name": "Test Recipe",
                      "calories": 10
                    }
                  }

      return request(app).post("/api/v1/meals/1/recipes").send(body).then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Missing/incorrectly formatted recipe information.")
      });
    });

    test('it should return a 400 status if calories not an integer', () => {
      const body = {
                    "api_key": "user1_key",
                    "recipe": {
                      "name": "Test Recipe",
                      "calories": "10",
                      "url": "testurl"

                    }
                  }

      return request(app).post("/api/v1/meals/1/recipes").send(body).then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Invalid calories. Must be integer.")
      });
    });

    test('it should return a 400 status with error message if meal already has food item', () => {
      const body = {
                    "api_key": "user1_key",
                    "recipe": {
                      "name": "Test Recipe",
                      "calories": 10,
                      "url": "testurl"
                    }
                  }

      return request(app).post("/api/v1/meals/1/recipes").send(body).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("That recipe already exists for that meal.")
      });
    });
  });
});
