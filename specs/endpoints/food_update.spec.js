var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food update API', () => {
  describe('Test PATCH /api/v1/foods/:id path', () => {
    describe('with a valid request', () => {
      beforeAll(() => {
        specHelper.tearDown()
        specHelper.testSetup()
      });

      test('it should return a 200 status', () => {
        const body = {
                      "name": "updated name",
                      "calories": 14
                    }

        return request(app).patch('/api/v1/foods/1').send(body)
        .then(response => {
          expect(response.status).toBe(200),
          expect(response.body.id).toBe(1),
          expect(response.body.name).toBe("updated name"),
          expect(response.body.calories).toBe(14)
        })
      });

      test('it should update food item in database', () => {
        return request(app).get('/api/v1/foods/1')
        .then(response => {
          expect(response.status).toBe(200),
          expect(response.body.id).toBe(1),
          expect(response.body.name).toBe("updated name"),
          expect(response.body.calories).toBe(14)
        });
      });
    });

    describe('it should return a 400 status when unsuccessful', () => {
      beforeAll(() => {
        specHelper.tearDown()
        specHelper.testSetup()
      });

      test('if invalid Id', () => {
        const body = {
                      "name": "valid name",
                      "calories": 14
                    }

        return request(app).patch("/api/v1/foods/999").send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });

      test('if name already exists (case insensitive)', () => {
        const body = {
                      "name": "CheEtos",
                      "calories": 14
                    }

        return request(app).patch('/api/v1/foods/2').send(body)
        .then(response => {
          expect(response.status).toBe(404)
          expect(response.body.error).toBe("name must be unique")
        })
      });

      test('if request if missing a name', () => {
        const body = {
                      "calories": 14
                    }

        return request(app).patch(`/api/v1/foods/1`).send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });

      test('if request if missing calories', () => {
        const body = {
                      "name": "valid name"
                    }

        return request(app).patch("/api/v1/foods/1").send(body)
        .then(response => {
          expect(response.status).toBe(404)
        })
      });
    });
  });
});
