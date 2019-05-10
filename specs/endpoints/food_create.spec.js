var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food create API', () => {
  describe('test POST /api/v1/foods path', () => {
    describe('for successful request', () => {
      beforeAll(() => {
        specHelper.tearDown()
        specHelper.testSetup()
      });

      test('it should create a food successfully', () => {
        const newFood = {
          name: "new name",
          calories: 27
        }

        return request(app).post("/api/v1/foods").send(newFood)
        .then(response => {
          expect(response.status).toBe(200),
          expect(response.body).toHaveProperty("id"),
          expect(response.body.name).toBe("new name"),
          expect(response.body.calories).toBe(27)
        })
      })
    })

    describe('with sad path circumstances', () => {
      beforeAll(() => {
        specHelper.tearDown()
        specHelper.testSetup()
      });

      test('it should not create a food with duplicate name (case insensitive)', () => {
        const newFood = {
          name: "CheeTos",
          calories: 27
        }

        return request(app).post("/api/v1/foods").send(newFood)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("Food already exists.")
        })
      })

      test('it should not create a food if unsuccessful due to missing name', () => {
        const newFood = {
          calories: 27
        }

        const errorMessage = "Name/Calories must be passed in to the body via x-www-form-urlencoded in the format of name or calories as the key and item name or calories count as the value without quotes"

        return request(app).post("/api/v1/foods").send(newFood)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe(errorMessage)
        })
      })

      test('it should not create a food if unsuccessful due to missing calories', () => {
        const newFood = {
          name: "test food"
        }

        const errorMessage = "Name/Calories must be passed in to the body via x-www-form-urlencoded in the format of name or calories as the key and item name or calories count as the value without quotes"

        return request(app).post("/api/v1/foods").send(newFood)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe(errorMessage)
        })
      })

      test('it should not create a food if unsuccessful due to incorrect datatype for calories', () => {
        const newFood = {
          name: "test food",
          calories: "twenty"
        }

        return request(app).post("/api/v1/foods").send(newFood)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("Please pass the calories datatype as a number.")
        })
      })
    })
  })
})
