import app from '../app/app';
import * as request from 'supertest'


describe("TestData API", () => {
    it("POST /unknown_path", async () => {
        const res = await request(app).post("/api/unknown_path")
        expect(res.status).toBe(404)
    })
})