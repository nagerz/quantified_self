var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Meal = require('../../models').Meal;

describe('Meal Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return Meal.create({name: 'test meal'})
    .then(meal => {
      expect(meal).toBeInstanceOf(Meal)
    })
  })

  test('It has attributes', () => {
    return Meal.create({name: 'another test meal'})
    .then(meal => {
      expect(meal.name).toBe('another test meal')
    })
  })

  test('It cannot be created without a name', () => {
    expect(Meal.create()).rejects.toThrow()
  })

  test('It cannot be created with a duplicate name', () => {
    expect(Meal.create({ name: 'test meal' })).rejects.toThrow()
  });

  test('It cannot be created with a case insesntive duplicate name', () => {
    expect(Meal.create({ name: 'TeSt MEal' })).rejects.toThrow()
  });
});
