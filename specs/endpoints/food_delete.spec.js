var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var Food = require('../../models').Food;

describe('Food delete API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterEach(() => {
    shell.exec('npx sequelize db:seed:undo:all')
  });

  describe('', () => {
    test('it should delete a food successfully', () => {
      Food.create({
        where: {
          id: 83,
          name: 'Cheese Puffs',
          calories: 1000
        }
      })
      return request(app).delete('/api/v1/foods/300')
        .then(response => {
          expect(response.status).toBe(204)
          expect(Food.findAll({where: { id: 83 }})).toBe("some error thing")
        })
    })

    test('it should not delete a food if request is unsuccessful, or if id does not match a record in the database', () => {
      Food.create({
        where: {
          id: 83,
          name: 'Cheese Puffs',
          calories: 1000
        }
      })
      return request(app).delete('/api/v1/foods/99999')
        .then(response => {
          expect(response.status).toBe(404)
          expect(Food.findAll({where: { id: 83 }}).id).toBe(83)
        })
    })

    test('it should return 404 if id not in url', () => {
      return request(app).delete('/api/v1/foods')
        .then(response => {
          expect(response.status).toBe(404)
        })
    })
  })
})
