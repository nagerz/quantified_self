var specHelper = require('../spec_helper');
var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food delete API', () => {
  describe('Test DELETE /api/v1/foods/:id path', () => {
    beforeEach(() => {
      specHelper.testSetup()
    });
    afterEach(() => {
      specHelper.tearDown()
    });

    test('it should delete a food successfully', () => {
      return Food.create({
        name:"test food",
        calories: 30
      })
      .then(food => {
        var id = food.id
      })

      return request(app).get(`/api/v1/foods/${id}`)
      .then(response => {
        expect(response.status).toBe(200)
      })

      return request(app).delete(`/api/v1/foods/${id}`)
      .then(response => {
        expect(response.status).toBe(204)
      })

      return request(app).get(`/api/v1/foods/${id}`)
      .then(response => {
        expect(response.status).toBe(404),
        expect(response.body.error).toBe("Requested food item could not be found.")
      })
    })

    test('it returns a 404 if the id does not match a food record in the database', () => {
      specHelper.tearDown()
      shell.exec('npx sequelize db:migrate')

      return request(app).delete('/api/v1/foods/1')
      .then(response => {
        expect(response.status).toBe(404),
        expect(response.body.error).toBe("Requested food item could not be found.")
      })
    })
  })
});
