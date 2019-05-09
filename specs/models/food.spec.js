var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food Model test', () => {
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
    return Food.create({name: 'cheetos', calories: 30})
    .then(cheetos => {
      expect(cheetos).toBeInstanceOf(Food)
    })
  })

  test('It has attributes', () => {
    return Food.create({name: 'cheetos', calories: 30})
    .then(cheetos => {
      expect(cheetos.name).toBe('cheetos')
      expect(cheetos.calories).toBe(30)
    })
  })
  //
  // test('It cannot be created without a name', () => {
  //   return Food.create({calories: 30})
  //   .then(error => {
  //     expect(error).rejects.toThrow()
  //   })
  // })
  //
  // test('It cannot be created without a calories', () => {
  //   return Food.create({name: "Cheetos"})
  //   .then(error => {
  //     expect(error).rejects.toThrow()
  //   })
  // })
  //
  // test('It cannot be created with a duplicate name and is case insensitive', () => {
  //   return Food.create({name: 'Cheetos', calories: 30})
  //   .then(cheetos => {
  //     expect(cheetos).toBeInstanceOf(Food)
  //   })
  //
  //   return Food.create({name: 'cheetos', calories: 30})
  //   .then(error => {
  //     expect(error).rejects.toThrow()
  //   })
  // })
})
