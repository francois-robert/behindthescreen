import app from '../app/app';
import { seedDatabase } from '../app/utils/seed-db';
import * as request from 'supertest'
import { connectDB, disconnectDB } from '../app/db';
import { User } from '../app/models/user';

describe("Users API", () => {

  beforeAll(async () => {
    await connectDB()
  })
  beforeEach(async () => {
    await seedDatabase()
  })

  afterAll(async () => {
    await disconnectDB()
  })

  describe("POST /users/login", () => {
    const ENDPOINT = '/api/users/login'

    describe("with valid credentials", () => {
      it("should respond with 200", async () => {
        const res = await request(app).post(ENDPOINT).send({
                      email: "fredisgreat@test.com",
                      password: "strongpwd"
                    })
        expect(res.status).toBe(200)
      });

    
      it("should return user infos", async () => {
        const res = await request(app).post(ENDPOINT).send({
          email: "fredisgreat@test.com",
                      password: "strongpwd"
                    })
        expect(res.body.user.email).toBe('fredisgreat@test.com')
        expect(res.body.user.username).toBe('fredisgreat')
      });
    });

    describe("with invalid credentials", () => {

      it("should return 422", async () => {
        const res = await request(app).post(ENDPOINT).send({
          email: "fredisgreat@test.com",
          password: "wrongpwd"
        })
        expect(res.status).toBe(422)
      })

      it("should specify error message", async () => {
        let res = await request(app).post(ENDPOINT).send({
          email: "emaildoesnotexists@test.com",
          password: "wrongpwd"
        })
        expect(res.body.message).toBe('Incorrect email.')

        res = await request(app).post(ENDPOINT).send({
          email: "fredisgreat@test.com",
          password: "wrongpwd"
        })
        expect(res.body.message).toBe('Incorrect password.')
      })

    });

    describe("with blank values", () => {

      it("should return 422", async () => {
        const res = await request(app).post(ENDPOINT).send({
          email: "",
          password: "wrongpwd"
        })
        expect(res.status).toBe(422)
      })

      it("should specify error 'Can't be blank'", async () => {
        let res = await request(app).post(ENDPOINT).send({
          email: "",
          password: "wrongpwd"
        })
        expect(res.body.errors.email).toBe("Can't be blank")

        res = await request(app).post(ENDPOINT).send({
          email: "fredisgreat@test.com",
          password: ""
        })
        expect(res.body.errors.password).toBe("Can't be blank")
      })

    });

  });


  describe("POST /users", () => {
    const ENDPOINT = '/api/users'

    describe("with valid user infos", () => {
      it("should respond with 200", async () => {
        const res = await request(app).post(ENDPOINT).send({
          username: "newuser",
          email: "newuser@test.com",
          password: "strongpwd"
        })
        expect(res.status).toBe(200)
      });

    
      it("should return user infos", async () => {
        const res = await request(app).post(ENDPOINT).send({
          username: "newuser",
          email: "newuser@test.com",
          password: "strongpwd"
        })
        expect(res.body.user.email).toBe('newuser@test.com')
        expect(res.body.user.username).toBe('newuser')
      });

      it("should save in DB", async () => {
        await request(app).post(ENDPOINT).send({
          username: "newuser",
          email: "newuser@test.com",
          password: "strongpwd"
        })

        const user = await User.findOne({username:"newuser"})
        expect(user.email).toBe('newuser@test.com')
      });
    });

    describe("with invalid user infos", () => {

      it("should return 422", async () => {
        const res = await request(app).post(ENDPOINT).send({
          email: "newuser@test.com",
          password: "strongpwd"
        })
        expect(res.status).toBe(422)
      })

      it("should specify error message", async () => {
        let res = await request(app).post(ENDPOINT).send({
          email: "newuser@test.com",
          password: "wrongpwd"
})
        expect(res.body.errors.email).toBe("Can't be blank")

        res = await request(app).post(ENDPOINT).send({
          username: "newuser",
          password: "wrongpwd"
})
        expect(res.body.errors.password).toBe("Can't be blank")
      })

    });

  });

});
