var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var MealFood = require('../../models').MealFood;
var Meal = require('../../models').Meal;
// var Food = require('../../models').Food;

describe('Meal Food create API', () => {
  describe('Test POST api/v1/meals/:meal_id/foods/:food_id', () => {
    beforeAll(() => {

      specHelper.drop()
      specHelper.testSetup()
    });

    test('it should return a 201 status if created', async () => {
      // MealFood.create({ MealId: 1, FoodId:4 }).then(response => {
      //   const mealFoods = await MealFood.findAll()
      //   expect(mealFoods.length).toBe(299)
      // })
      MealFood.findAll().then(response => {
        console.log(response)
        expect(response.length).toBe(2)
      })

      Meal.findAll({ where: { id: 1}}).then(response => {
        console.log(response)
        expect(response.length).toBe(2)
      })

      // Meal.findAll().then(response => {
      //   console.log(response)
      //   expect(response.length).toBe(299)
      // })

      return request(app).post('/api/v1/meals/1/foods/4').then(response => {
        expect(response).toBe(201)
        expect(response.body).toBe('Successfully added hotdog to Breakfast')
      })
    })

    test.skip('it should return a 400 status if the meal food already exists', () => {
      return request(app).post('/api/v1/meals/2/foods/4').then(response => {
        // expect(response.status).toBe(400)
        expect(response.body).toBe('That food already exists for that meal.')
      })
    })

    test.skip('it should return a 404 status if the food does not exist', () => {
      return request(app).post('/api/v1/meals/1/foods/29').then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('No food with that ID.')
      })
    })

    test.skip('it should return a 404 status if the food does not exist', () => {
      return request(app).post('/api/v1/meals/28/foods/1').then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('No meal with that ID.')
      })
    })
  })
})
