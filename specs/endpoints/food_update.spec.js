var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food update API', () => {
  describe('Test PATCH /api/v1/foods/:id path', () => {
    describe('with a valid request', () => {
      beforeEach(() => {
        specHelper.testSetup()
      });
      afterEach(() => {
        specHelper.tearDown()
      });

      test('it should return a 200 status', () => {
        const body = {
                      "food":
                        {
                          "name": "test name",
                          "calories": 14
                        }
                      }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(200)
        })
      });

      test('it should return a food object', () => {
        const body = {
                      "food":
                        {
                          "name": "test name",
                          "calories": 14
                        }
                      }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.body.id).toBe(1)
          expect(response.body.name).toBe("test name")
          expect(response.body.calories).toBe(14)
        })
      });

      test.skip('it should update food item in database', async () => {
        await Food.findOne({
          where:{id: 1}
        })
        .then(food => {
          expect(food.id).toBe(1)
          expect(food.name).toBe("cheetos")
          expect(food.calories).toBe(30)
        });

        const body = {
                      "food":
                        {
                          "name": "mint",
                          "calories": 14
                        }
                      }

        await request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(200)
        });

        await Food.findOne({
          where:{id: 1}
        })
        .then(food => {
          expect(food.id).toBe(1)
          expect(food.name).toBe("mint")
          expect(food.calories).toBe(14)
        });
      });
    });

    describe('it should return a 400 status when unsuccessful', () => {
      beforeEach(() => {
        specHelper.testSetup()
      });
      afterEach(() => {
        specHelper.tearDown()
      });

      test.skip('if invalid Id', () => {
        const body = {
                      "food":
                        {
                          "name": "mint",
                          "calories": 14
                        }
                      }

        return request(app).patch("/api/v1/foods/4").send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });

      test.skip('if name already exists', () => {
        const body = {
                      "food":
                        {
                          "name": "Cheetos",
                          "calories": 14
                        }
                      }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(404)
          expect(response.body.error).toBe("name must be unique")
        })
      });

      test.skip('if request if missing a name', () => {
        const body = {
                      "food":
                        {
                          "calories": 14
                        }
                      }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(400)
        })
      });

      test.skip('if request if missing calories', () => {
        const body = {
                      "food":
                        {
                          "name": "Mint"
                        }
                      }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(400)
        })
      });

      test.skip('if request if missing food tag', () => {
        const body = {
                      "name": "Mint",
                      "calories": 14
                    }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(400)
        })
      });
    });
  });
});
