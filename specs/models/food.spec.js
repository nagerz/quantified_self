var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var food = require('../../models').Food;
var pry = require('pryjs');

describe('Food Model test', () => {
  test('It should exist', () => {
    const cheetos = Food.create({name: 'Cheetos', calories: 30})

    expect(cheetos).toBeInstanceOf(Food)
  })

  test('It has attributes', () => {
    const cheetos = Food.create({name: 'Cheetos', calories: 30})

    expect(cheetos.name).toBe('Cheetos')
    expect(cheetos.calories).toBe(30)
  })

  test('It cannot be created without a name', () => {
    const cheetos = Food.create({calories: 30})

    expect(cheetos).not(Food)
  })

  test('It cannot be created without a calories', () => {
    const cheetos = Food.create({name: "Cheetos"})

    expect(cheetos).not(Food)
  })

  test('It cannot be created with a duplicate name and is case insensitive', () => {
    const cheetos = Food.create({name: 'Cheetos', calories: 30})

    expect(cheetos).toBeInstanceOf(Food)

    const cheetosAgain = Food.create({name: 'cheetos', calories: 30})

    expect(cheetosAgain).not(Food)
  })
})
