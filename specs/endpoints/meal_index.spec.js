var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Meal index API', () => {
  describe('Test GET /api/v1/meals', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status', () => {
      return request(app).get('/api/v1/meals').then(response => {
        expect(response.status).toBe(200)
        expect(response.body[0]).toHaveProperty('id')
        expect(response.body[0]).toHaveProperty('name')
        expect(response.body[0]).toHaveProperty('Food')
        expect(response.body[0].Food[0]).toHaveProperty('id')
        expect(response.body[0].Food[0]).toHaveProperty('name')
        expect(response.body[0].Food[0]).toHaveProperty('calories')
      })
    })
  })
})
