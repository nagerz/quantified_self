var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var Meal = require('../../models').Meal;

describe('Meal Model test', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('npx sequelize db:migrate')
  });
  afterEach(() => {
  });
  afterAll(() => {
    shell.exec('npx sequelize db:seed:undo:all')
  });

  test('It should exist', () => {
    return Meal.create({name: 'Test meal'})
    .then(meal => {
      expect(meal).toBeInstanceOf(Meal)
    })
  })

  test('It has attributes', () => {
    return Meal.create({name: 'Test meal'})
    .then(meal => {
      expect(meal.name).toBe('Test meal')
    })
  })
})
//   //
//   // test('It cannot be created without a name', () => {
//   //   return Food.create({calories: 30})
//   //   .then(error => {
//   //     expect(error).rejects.toThrow()
//   //   })
//   // })
//   //
//   // test('It cannot be created without a calories', () => {
//   //   return Food.create({name: "Cheetos"})
//   //   .then(error => {
//   //     expect(error).rejects.toThrow()
//   //   })
//   // })
//   //
//   // test('It cannot be created with a duplicate name and is case insensitive', () => {
//   //   return Food.create({name: 'Cheetos', calories: 30})
//   //   .then(cheetos => {
//   //     expect(cheetos).toBeInstanceOf(Food)
//   //   })
//   //
//   //   return Food.create({name: 'cheetos', calories: 30})
//   //   .then(error => {
//   //     expect(error).rejects.toThrow()
//   //   })
//   // })
// })
