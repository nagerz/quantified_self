var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('User create API', () => {
  describe('test POST /api/v1/users path', () => {
    describe('for successful request', () => {
      beforeAll(() => {
        specHelper.tearDown()
        specHelper.testSetup()
      });

      test('it should create a user successfully', () => {
        const newUser = {
          email: "new email",
          password: "password",
          password_confirmation: "password"
        }

        return request(app).post("/api/v1/users").send(newUser)
        .then(response => {
          expect(response.status).toBe(201),
          expect(response.body).toHaveProperty("api_key")
        })
      })
    })

    describe('with sad path circumstances', () => {
      beforeAll(() => {
        specHelper.tearDown()
        specHelper.testSetup()
      });

      test('it should not create a user with duplicate email (case insensitive)', () => {
        const newUser = {
          email: "uSer1@email.com",
          password: "password",
          password_confirmation: "password"
        }

        return request(app).post("/api/v1/users").send(newUser)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("Email taken.")
        })
      })

      test('it should not create a user if missing email', () => {
        const newUser = {
          password: "password",
          password_confirmation: "password"
        }

        return request(app).post("/api/v1/users").send(newUser)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("must provide email")
        })
      })

      test('it should not create a user if missing password', () => {
        const newUser = {
          email: "new email",
          password_confirmation: "password"
        }

        return request(app).post("/api/v1/users").send(newUser)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("must provide password")
        })
      })

      test('it should not create a user if missing password confirmation', () => {
        const newUser = {
          email: "new email",
          password: "password"
        }

        return request(app).post("/api/v1/users").send(newUser)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("must provide password")
        })
      })

      test("it should not create a user if password confirmation doesn't match", () => {
        const newUser = {
          email: "new email",
          password: "password",
          password_confirmation: "not_password"
        }

        return request(app).post("/api/v1/users").send(newUser)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("passwords don't match")
        })
      })
    })
  })
})
