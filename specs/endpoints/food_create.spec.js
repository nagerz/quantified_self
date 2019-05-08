var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');

// describe('Test POST /api/v1/foods path', () => {
//   test('it should return the successfully created food', () => {
//     return request(app).post("/api/v1/foods").then(response => {
//       expect(response.statusCode).toBe(200)
//     })
//   })
// })
describe('Food create API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:seed:undo:all')
  });

  // describe('Test POST /api/v1/foods path' , () => {
  //   test('it should create a food', async() => {
  //     const newFood =  {
  //       name: "Pringles",
  //       calories: 27
  //      }
  //      try {
  //        const response = await request(app).post('/api/v1/service/foods').send(newFood)
  //        expect(response.statusCode).toBe(20)
  // Try it with await in front of expect
  //      } catch (err) {
  //        // write some test here
  //        expect(response.statusCode).toBe(500)
  //      }
  //     }
  //   })
  // })
  describe('Test POST /api/v1/foods path' , () => {
    test('it should create a food successfully', () => {
      const newFood =  {
        name: "Pringles",
        calories: 27
      }
      return request(app).post("/api/v1/foods").send(newFood)
      .then(response => {
        expect(response.status).toBe(200),
        expect(response.body.id).toBe(1),
        expect(response.body.name).toBe("Pringles"),
        expect(response.body.calories).toBe(27)
      })

      const newFoodPringlesNotCapitalized =  {
        name: "pringles",
        calories: 27
      }
      return request(app).post("/api/v1/foods").send(newFood)
      .then(response => {
        expect(response.status).toBe(200),
        expect(response.body.id).toBe(1),
        expect(response.body.name).toBe("Pringles"),
        expect(response.body.calories).toBe(27)
      })
    })

    test('it should not create a food if unsuccessful due to missing name', () => {
      const newFood =  {
        calories: 27
      }
      return request(app).post("/api/v1/foods").send(newFood)
      .then(response => {
        expect(response.status).toBe(400)
      })
    })

    test('it should not create a food if unsuccessful due to missing calories', () => {
      const newFood =  {
        name: "Pringles"
      }
      return request(app).post("/api/v1/foods").send(newFood)
      .then(response => {
        expect(response.status).toBe(400)
      })
    })
  })
})
