import app from '../app/app';
import { seedDatabase } from '../app/utils/seed-db';
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

        it("should respond with 200", async () => {
            const res = await request(app).post("/api/testData/seed").send({})
            expect(res.status).toBe(200)
        });

        
        it("should add users", async () => {
            await request(app).post("/api/testData/seed").send({})
            const user = await User.findOne({username:"fredisgreat"})

            expect(user.email).toBe('fredisgreat@test.com')
        });
    });

    describe("GET /api/testData/:entity", () => {

        beforeEach(async () => {
            await seedDatabase()
        })
        
        it("todo", () => {
            expect(true).toBe(true)
        })
        
    });

});
