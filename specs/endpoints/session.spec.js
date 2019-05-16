var specHelper = require('../spec_helper');
var request = require("supertest");
var app = require('../../app');

describe('Session create API', () => {
  describe('test POST /api/v1/sessions path', () => {
    describe('for successful request', () => {
      beforeAll(() => {
        specHelper.tearDown()
        specHelper.testSetup()
      });

      test('it can create a user successfully', () => {
        const body = {
          email: "newemail@email.com",
          password: "password",
          password_confirmation: "password"
        }

        return request(app).post("/api/v1/users").send(body)
        .then(response => {
          expect(response.status).toBe(201),
          expect(response.body).toHaveProperty("api_key")
        })
      })

      test('it can create a session successfully', () => {
        const body = {
          email: "newemail@email.com",
          password: "password"
        }

        return request(app).post("/api/v1/sessions").send(body)
        .then(response => {
          expect(response.status).toBe(200),
          expect(response.body).toHaveProperty("api_key")
        })
      })
    })

    describe('with sad path circumstances', () => {
      beforeAll(() => {
        specHelper.tearDown()
        specHelper.testSetup()
      });

      //Make a new user
      const body = {
        email: "new email",
        password: "password",
        password_confirmation: "password"
      }

      return request(app).post("/api/v1/users").send(body)

      test('it can not create a session if missing email', () => {
        const body = {
          password: "password"
        }

        return request(app).post("/api/v1/sessions").send(body)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("must provide email")
        })
      })

      test('it should not create a session if missing password', () => {
        const body = {
          email: "new email"
        }

        return request(app).post("/api/v1/sessions").send(body)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("must provide password")
        })
      })

      test('it should not create a user if incorrect password', () => {
        const body = {
          email: "new email",
          password: "not_password"
        }

        return request(app).post("/api/v1/sessions").send(body)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("incorrect password")
        })
      })

      test("it should not create a session if email bad", () => {
        const body = {
          email: "no email",
          password: "password"
        }

        return request(app).post("/api/v1/sessions").send(body)
        .then(response => {
          expect(response.status).toBe(400),
          expect(response.body.error).toBe("email does not match any records")
        })
      })
    })
  })
})
