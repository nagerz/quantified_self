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
        expect(response.body.length).toBe(7)
        expect(response.body[0].id).toBe(1)
        expect(response.body[0].name).toBe('Monday Breakfast')
        expect(response.body[0].Food.length).toBe(3)
        expect(response.body[0].Food[0].id).toBe(1)
        expect(response.body[0].Food[0].name).toBe('cheetos')
        expect(response.body[0].Food[0].calories).toBe(300)
        expect(response.body[0].Recipes.length).toBe(1)
        expect(response.body[0].Recipes[0].id).toBe(1)
        expect(response.body[0].Recipes[0].name).toBe('Fancy Chicken Recipe')
        expect(response.body[0].Recipes[0].calories).toBe(1300)
        expect(response.body[0].Recipes[0].url).toBe('chickenurl')
        expect(response.body[0].totalCalories).toBe(2105)
      })
    })
  })
})
