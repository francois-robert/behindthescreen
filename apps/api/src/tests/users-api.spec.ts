import app from '../app/app';
import { seedDatabase, seedUsers } from '../app/utils/seed-db';
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
    const testUser = seedUsers[0]
    const userPayload = { email: testUser.email, password: testUser.password}

    describe("with valid credentials", () => {
      it("should respond with 200", async () => {
        const res = await request(app).post(ENDPOINT).send(userPayload)
        expect(res.status).toBe(200)
      });

    
      it("should return user infos", async () => {
        const res = await request(app).post(ENDPOINT).send(userPayload)
        expect(res.body.email).toBe(testUser.email)
        expect(res.body.username).toBe(testUser.username)
      });
    });

    describe("with invalid credentials", () => {
      it("should return 422", async () => {
        const res = await request(app).post(ENDPOINT).send(Object.assign({}, userPayload, {password: "wrongpwd"}))
        expect(res.status).toBe(422)
      })

      it("should specify error message", async () => {
        let res = await request(app).post(ENDPOINT).send(Object.assign({}, userPayload, {email: "doesnotexists@gmail.com"}))
        expect(res.body.errors.email).toBe('incorrect')

        res = await request(app).post(ENDPOINT).send(Object.assign({}, userPayload, {password: "wrongpwd"}))
        expect(res.body.errors.password).toBe('incorrect')
      })

    });

    describe("with blank values", () => {

      it("should return 422", async () => {
        const res = await request(app).post(ENDPOINT).send(Object.assign({}, userPayload, {email: ""}))
        expect(res.status).toBe(422)
      })

      it("should specify error 'Can't be blank'", async () => {
        let res = await request(app).post(ENDPOINT).send(Object.assign({}, userPayload, {email: ""}))
        expect(res.body.errors.email).toBe("can't be blank")

        res = await request(app).post(ENDPOINT).send(Object.assign({}, userPayload, {password: ""}))
        expect(res.body.errors.password).toBe("can't be blank")
      })

    });

  });


  describe("POST /users", () => {
    const ENDPOINT = '/api/users'
    const userPayload = { username: "iamanewuser", email: "new-user@yahoo.fr", password: "thisisarealystrongpwd"}

    describe("with valid user infos", () => {
      it("should respond with 200", async () => {
        const res = await request(app).post(ENDPOINT).send(userPayload)
        expect(res.status).toBe(200)
      });

    
      it("should return user infos", async () => {
        const res = await request(app).post(ENDPOINT).send(userPayload)
        expect(res.body.email).toBe(userPayload.email)
        expect(res.body.username).toBe(userPayload.username)
      });

      it("should save in DB", async () => {
        await request(app).post(ENDPOINT).send(userPayload)

        const user = await User.findOne({username:userPayload.username})
        expect(user.email).toBe(userPayload.email)
      });
    });

    describe("with invalid user infos", () => {

      it("should return 422", async () => {
        const res = await request(app).post(ENDPOINT).send({
          email: userPayload.email,
          password: userPayload.password
        })
        expect(res.status).toBe(422)
      })

      it("should specify error message", async () => {
        let res = await request(app).post(ENDPOINT).send({
          email: userPayload.email,
          password: userPayload.password
        })
        expect(res.body.errors.username).toBe("can't be blank")

        res = await request(app).post(ENDPOINT).send({
          username: userPayload.username,
          password: userPayload.password
        })
        expect(res.body.errors.email).toBe("can't be blank")
      })

    });

  });

  describe("GET /users/user", () => {
    const ENDPOINT = '/api/user'
    const testUser = seedUsers[0]

    describe("with valid user token", () => {
      it("should return 200", async () => {
        const user = await User.findOne({email:testUser.email})
        let res = await request(app).get(ENDPOINT).set('Authorization', 'Bearer ' + user.generateJWT())
        expect(res.status).toBe(200)

        res = await request(app).get(ENDPOINT+"?token=" + user.generateJWT())
        expect(res.status).toBe(200)

      })

      it("should return user infos", async () => {
        const user = await User.findOne({email:testUser.email})
        const token = user.generateJWT()
        const res = await request(app).get(ENDPOINT).set('Authorization', 'Bearer ' + token)

        expect(res.body.email).toBe(user.email)
        expect(res.body.username).toBe(user.username)
        expect(res.body.bio).toBe(user.bio)
        expect(res.body.image).toBe(user.image)
      })
    })

    describe("with invalid user token", () => {
      it("should return 401", async () => {
        let res = await request(app).get(ENDPOINT).set('Authorization', '')
        expect(res.status).toBe(401)

        res = await request(app).get(ENDPOINT)
        expect(res.status).toBe(401)

      })
    })

  });

});
