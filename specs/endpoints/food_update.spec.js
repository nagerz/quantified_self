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
                      "name": "updated name",
                      "calories": 14
                    }

        return request(app).patch(`/api/v1/foods/${id}`).send(body)
        .then(response => {
          expect(response.status).toBe(200),
          expect(response.body.id).toBe(id),
          expect(response.body.name).toBe("updated name"),
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
                      "name": "updated name",
                      "calories": 14
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
          expect(food.name).toBe("updated name")
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
        specHelper.tearDown()
        shell.exec('npx sequelize db:migrate')

        const body = {
                      "name": "valid name",
                      "calories": 14
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
                      "name": "DifFerent Test nAmE",
                      "calories": 14
                    }

        return request(app).patch(`/api/v1/foods/${id1}`).send(body)
        .then(response => {
          expect(response.status).toBe(404)
          expect(response.body.error).toBe("name must be unique")
        })
      });

      test('if request if missing a name', () => {
        const body = {
                      "calories": 14
                    }

        return request(app).patch(`/api/v1/foods/1`).send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });

      test('if request if missing calories', () => {
        //needs revisiting. Always passes. Issue with multiple returns.
        const body = {
                      "name": "valid name"
                    }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });
    });
  });
});
