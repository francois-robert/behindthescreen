import app from '../app/app';
import { seedDatabase, seedUsers } from '../app/utils/seed-db';
import * as request from 'supertest'
import { connectDB, disconnectDB } from '../app/db';
import { User } from '../app/models/user';

describe("TestData API", () => {

    beforeAll(async () => {
        await connectDB()
    })

    afterAll(async () => {
        await disconnectDB()
    })

    describe("POST /testData/seed", () => {
        const ENDPOINT = "/api/testData/seed"

        it("should respond with 200", async () => {
            const res = await request(app).post(ENDPOINT).send({})
            expect(res.status).toBe(200)
        });

        
        it("should add users", async () => {
            await request(app).post(ENDPOINT).send({})
            await Promise.all(seedUsers.map(async (user) => {
                const userDB = await User.findOne({username:user.username})
                expect(userDB.email).toBe(user.email)
                expect(userDB.username).toBe(user.username)
            }))
        });
    });

    describe("GET /api/testData/:entity", () => {

        beforeEach(async () => {
            await seedDatabase()
        })

        describe("with nonexistent entity", () => {
            const ENDPOINT = "/api/testData/doesnotexists"
            it("should respond with 422", async () => {
                const res = await request(app).get(ENDPOINT)
                expect(res.status).toBe(422)
            })
        })

        describe("with users entity", () => {
            const ENDPOINT = "/api/testData/users"

            it("should respond with 200", async () => {
                const res = await request(app).get(ENDPOINT)
                expect(res.status).toBe(200)
            })

            it("should return all users as result", async () => {
                const res = await request(app).get(ENDPOINT)
                seedUsers.map((userDB) => {
                    expect(res.body.results).toEqual(
                        expect.arrayContaining([
                          expect.objectContaining({email: userDB.email})
                        ])
                      )
                })

            });
        });
    });
});
