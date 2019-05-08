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

  describe('Test POST /api/v1/foods path' , () => {
    test('Create a food', async() => {
      const newFood =  {
        name: "Pringles",
        calories: 27
       }
       try {
         const response = await request(app).post('/api/v1/service/foods').send(newFood)
         expect(response.statusCode).toBe(20)
       } catch (err) {
         // write some test here
         expect(response.statusCode).toBe(500)
       }
      }
    })
  })
})
