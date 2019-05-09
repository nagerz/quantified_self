var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food Model test', () => {
  beforeEach(() => {
    specHelper.testSetup()
  });
  afterEach(() => {
    specHelper.tearDown()
  });

  test('It should exist', () => {
    return Food.create({name: 'test name', calories: 30})
    .then(food => {
      expect(food).toBeInstanceOf(Food)
    })
  })

  test('It has attributes', () => {
    return Food.create({name: 'test name', calories: 30})
    .then(food => {
      expect(food.name).toBe('test name')
      expect(food.calories).toBe(30)
    })
  })

  test('It cannot be created without a name', () => {
    expect(Food.create({ calories: 30 })).rejects.toThrow()
  })

  test('It cannot be created without a calories', () => {
    expect(Food.create({ name: "name" })).rejects.toThrow()
  });

  test('It cannot be created with a duplicate name', () => {
    expect(Food.create({ name: 'cheetos', calories: 30 })).rejects.toThrow()
  });

  test('It cannot be created with a case insesntive duplicate name', () => {
    expect(Food.create({ name: 'CheeTOs', calories: 30 })).rejects.toThrow()
  });
})
