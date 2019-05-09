var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Meal = require('../../models').Meal;

describe('Meal Model test', () => {
  beforeEach(() => {
    specHelper.testSetup()
  });
  afterEach(() => {
    specHelper.tearDown()
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

  test('It cannot be created without a name', () => {
    expect(Meal.create()).rejects.toThrow()
  })

  test('It cannot be created with a duplicate name', () => {
    expect(Meal.create({ name: 'breakfast' })).rejects.toThrow()
  });

  test('It cannot be created with a case insesntive duplicate name', () => {
    expect(Meal.create({ name: 'BreakFast' })).rejects.toThrow()
  });
})
