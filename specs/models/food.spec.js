var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;
var pry = require('pryjs');

describe('Food Model test', () => {
  test('It should exist', () => {
    Food.create({name: 'Cheetos', calories: 30})
    .then(cheetos => {
      expect(cheetos).toBeInstanceOf(Food)
    })
  })

  test('It has attributes', () => {
    Food.create({name: 'Cheetos', calories: 30})
    .then(cheetos => {
      expect(cheetos.name).toBe('Cheetos')
      expect(cheetos.calories).toBe(30)
    })
  })

  test('It cannot be created without a name', () => {
    Food.create({calories: 30})
    .then(cheetos => {
      expect(cheetos).not(Food)
    })
  })

  test('It cannot be created without a calories', () => {
    Food.create({name: "Cheetos"})
    .then(cheetos => {
      expect(cheetos).toBeInstanceOf(Food)
    })
  })

  test('It cannot be created with a duplicate name and is case insensitive', () => {
    Food.create({name: 'Cheetos', calories: 30})
    .then(cheetos => {
      expect(cheetos).toBeInstanceOf(Food)
    })

    Food.create({name: 'cheetos', calories: 30})
    .then(cheetosAgain => {
      expect(cheetosAgain).not(Food)
    })
  })
})
