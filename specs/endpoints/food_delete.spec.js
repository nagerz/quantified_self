var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food delete API', () => {
  describe('Test DELETE /api/v1/foods/:id path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should delete a food successfully', () => {
      return request(app).delete('/api/v1/foods/1')
      .then(response => {
        expect(response.status).toBe(204)
      })
    })

    test('food is deleted from database', () => {
      return request(app).get('/api/v1/foods/1')
      .then(response => {
        expect(response.status).toBe(404),
        expect(response.body.error).toBe("Requested food item could not be found.")
      })
    })

    test('it returns a 404 if the id does not match a food record in the database', () => {
      return request(app).delete('/api/v1/foods/1')
      .then(response => {
        expect(response.status).toBe(404),
        expect(response.body.error).toBe("Requested food item could not be found.")
      })
    })
  })
});
