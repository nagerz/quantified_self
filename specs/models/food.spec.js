var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food Model test', () => {
  beforeAll(() => {
    specHelper.tearDown()
    specHelper.testSetup()
  });

  test('It should exist', () => {
    return Food.create({name: 'test name', calories: 30})
    .then(food => {
      expect(food).toBeInstanceOf(Food)
    })
  })

  test('It has attributes', () => {
    return Food.create({name: 'another test name', calories: 30})
    .then(food => {
      expect(food.name).toBe('another test name')
      expect(food.calories).toBe(30)
    })
  })

  test('It cannot be created without a name', () => {
    expect(Food.create({ calories: 30 })).rejects.toThrow()
  })

  test('It cannot be created without a calories', () => {
    expect(Food.create({ name: "test name" })).rejects.toThrow()
  });

  test('It cannot be created with a duplicate name', () => {
    expect(Food.create({ name: 'test name', calories: 30 })).rejects.toThrow()
  });

  test('It cannot be created with a case insesntive duplicate name', () => {
    expect(Food.create({ name: 'TeSt naMe', calories: 30 })).rejects.toThrow()
  });
})
