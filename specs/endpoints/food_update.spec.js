var specHelper = require('../spec_helper');
var shell = require('shelljs');
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
        return Food.create({
          name:"test name",
          calories: 30
        })
        .then(food => {
          var id = food.id
        })

        const body = {
                      "food":
                        {
                          "name": "new test name",
                          "calories": 14
                        }
                      }

        return request(app).patch(`/api/v1/foods/${id}`).send(body)
        .then(response => {
          expect(response.status).toBe(200),
          expect(response.body.id).toBe(id),
          expect(response.body.name).toBe("new test name"),
          expect(response.body.calories).toBe(14)
        })
      });

      test('it should update food item in database', () => {
        return Food.create({
          name:"test name",
          calories: 30
        })
        .then(food => {
          var id = food.id
        })

        const body = {
                      "food":
                        {
                          "name": "updated name",
                          "calories": 14
                        }
                      }

        return request(app).patch(`/api/v1/foods/${id}`).send(body)
        .then(response => {
          expect(response.status).toBe(200)
        });

        return Food.findOne({
          where:{id: id}
        })
        .then(food => {
          expect(food.id).toBe(id)
          expect(food.name).toBe("updat name")
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

      test('if invalid Id', () => {
        specHelper.tearDown()
        shell.exec('npx sequelize db:migrate')

        const body = {
                      "food":
                        {
                          "name": "valid name",
                          "calories": 14
                        }
                      }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });

      test('if name already exists (case insensitive)', () => {
        //needs revisiting. Always passes. Issue with multiple returns.
        return Food.create({
          name:"test name",
          calories: 30
        })
        .then(food => {
          var id1 = food.id
        })

        return Food.create({
          name:"different test name",
          calories: 30
        })
        .then(food => {
          var name2 = food.name
        })

        const body = {
                      "food":
                        {
                          "name": "DifFerent Test nAmE",
                          "calories": 14
                        }
                      }

        return request(app).patch(`/api/v1/foods/${id1}`).send(body)
        .then(response => {
          expect(response.status).toBe(404)
          expect(response.body.error).toBe("name must be unique")
        })
      });

      test('if request if missing a name', () => {
        const body = {
                      "food":
                        {
                          "calories": 14
                        }
                      }

        return request(app).patch(`/api/v1/foods/1`).send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });

      test('if request if missing calories', () => {
        //needs revisiting. Always passes. Issue with multiple returns.
        const body = {
                      "food":
                        {
                          "name": "Mint"
                        }
                      }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });

      test('if request if missing food tag', () => {
        //needs revisiting. Always passes. Issue with multiple returns.
        const body = {
                      "name": "Mint",
                      "calories": 14
                    }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });
    });
  });
});
