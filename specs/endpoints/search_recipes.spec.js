var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Search recipes index API', () => {
  describe('Test GET /api/v1/search/recipes?mealType=MEALTYPE&query=QUERY path', () => {
    beforeAll(() => {
      specHelper.tearDown()
      specHelper.testSetup()
    });

    test('it should return a 200 status for boring path', () => {
      return request(app).get("/api/v1/search/recipes?mealType=boring&query=chicken").then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toEqual(10)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('url')
        expect(Object.keys(response.body[0])).toContain('yield')
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(Object.keys(response.body[0])).toContain('image')
        expect(Object.keys(response.body[0])).toContain('totalTime')
      });
    });

    test('it should return a 200 status for heart attack path', () => {
      return request(app).get("/api/v1/search/recipes?mealType=heart-attack&query=chicken").then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toEqual(10)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('url')
        expect(Object.keys(response.body[0])).toContain('yield')
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(Object.keys(response.body[0])).toContain('image')
        expect(Object.keys(response.body[0])).toContain('totalTime')
      });
    });

    test('it should return a 200 status for bang for your buck path', () => {
      return request(app).get("/api/v1/search/recipes?mealType=bang-for-your-buck&query=chicken").then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toEqual(10)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('url')
        expect(Object.keys(response.body[0])).toContain('yield')
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(Object.keys(response.body[0])).toContain('image')
        expect(Object.keys(response.body[0])).toContain('totalTime')
      });
    });

    test('it should return a 200 status for boring path with wierd query', () => {
      return request(app).get("/api/v1/search/recipes?mealType=boring&query=cHicKeN").then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toEqual(10)
        expect(Object.keys(response.body[0])).toContain('id')
        expect(Object.keys(response.body[0])).toContain('name')
        expect(Object.keys(response.body[0])).toContain('url')
        expect(Object.keys(response.body[0])).toContain('yield')
        expect(Object.keys(response.body[0])).toContain('calories')
        expect(Object.keys(response.body[0])).toContain('image')
        expect(Object.keys(response.body[0])).toContain('totalTime')
      });
    });

    test('it should return a 404 status if no mealtype', () => {
      return request(app).get("/api/v1/search/recipes?query=chicken").then(response => {
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe("Missing mealType and/or query.")
      });
    });

    test('it should return a 404 status if bad mealtype', () => {
      return request(app).get("/api/v1/search/recipes?mealType=bad&query=chicken").then(response => {
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe("Invalid meal type.")
      });
    });

    test('it should return a 404 status if no query', () => {
      return request(app).get("/api/v1/search/recipes?mealType=boring").then(response => {
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe("Missing mealType and/or query.")
      });
    });
  });
});
