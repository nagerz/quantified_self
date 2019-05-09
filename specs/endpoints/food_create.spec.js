var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food create API', () => {
  describe('Test POST /api/v1/foods path', () => {
    beforeEach(() => {
      specHelper.testSetup()
    });
    afterEach(() => {
      specHelper.tearDown()
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

    describe('with sad path circumstances', () => {
      test.skip('it should not create a food with duplicate name (case insensitive)', () => {
        const newFood = {
          name: "PRinglEs",
          calories: 27
        }

        Food.create({
          name:"pringles",
          calories: 30
        })

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
        return request(app).post("/api/v1/foods").send(newFood)
        .then(response => {
          expect(response.status).toBe(400)
        })
      })

      test('it should not create a food if unsuccessful due to missing calories', () => {
        const newFood = {
          name: "Pringles"
        }
        return request(app).post("/api/v1/foods").send(newFood)
        .then(response => {
          expect(response.status).toBe(400)
        })
      })

      test('it should not create a food if unsuccessful due to incorrect datatype for calorie', () => {
        const newFood = {
          name: "test food",
          calories: "twenty"
        }

        return request(app).post("/api/v1/foods").send(newFood)
        .then(response => {
          expect(response.status).toBe(400)
        })
      })
    })
  })
})
