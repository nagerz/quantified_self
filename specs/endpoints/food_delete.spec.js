var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food delete API', () => {
  beforeEach(() => {
    specHelper.testSetup()
  });
  afterEach(() => {
    specHelper.tearDown()
  });

  describe('', () => {
    test('it should delete a food successfully', () => {
      // Below is an alternative way to create a food. Although, by utilizing this way,
      // I am receiving the error that food cannot be created without a name, I don't understand
      // why the given name of Cheese Puffs is not being utilized.

      // const id = 83
      // Food.create({
      //   where: {
      //     id: id,
      //     name: 'Cheese Puffs',
      //     calories: 1000
      //   }
      // })


// An alternative way to create a food is to send a POST request, like below.
//  Check the count of Food items in the database, then send a DELETE request,
// And check the count of items in the database again.

      const newFood = {
        name: "Pringles",
        calories: 27
      }

      return request(app).post("/api/v1/foods").send(newFood)
      .then(response => {
        expect(response.status).toBe(200)
        const matchingFoods = Food.findAndCountAll({
          where: {
            name: "Pringles"
          }
        })
          .then(foods => {
            // This line doesn't seem to be running
            expect(foods.count).toBe(1)

// I'd like to utilize the below code once the above it worked out and we feel confident
//  that a food item is being created in the test database.

// I am having some difficulties with grabbing the id from the food created above,
// and passing it to the url for the DELETE

            // return request(app).delete(`/api/v1/foods/${id}`)
            // .then(response => {
            //   expect(response.status).toBe(404)
              // Food.findAll({ where: { id: id } })
              //   .then(response => {
                //     expect(response).toBe([])
                //   })
              // })
          })


      })




    })

// The below tests are passing, but are commented out for the sake of simplicity until the above if figured out.

    // test('It returns a 404 if the id does not match a food record in the database', () => {
    //   const id = 99999
    //
    //   return request(app).delete(`/api/v1/foods/${id}`)
    //     .then(response => {
    //       expect(response.status).toBe(404)
    //       Food.findOne({where: { id: id }})
    //         .then(food => {
    //           expect(food).toBe([])
    //         })
    //     })
    // })
    //
    // test('it should return 404 if the id not in the url', () => {
    //   return request(app).delete('/api/v1/foods')
    //     .then(response => {
    //       expect(response.status).toBe(404)
    //     })
    // })
  })
})
