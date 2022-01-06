import app from '../app/app';
import { seedDatabase } from '../app/utils/seed-db'; // à intégrer en asynchone !!
import * as request from 'supertest'

describe("Users API", () => {
  describe("POST /users/login", () => {
    it("should return 200 if OK", (done) => {
      request(app).post("/api/users/login")
                  .send({
                    email: "fredisgreat@test.com",
                    password: "strongpwd"
                  })
                  .expect(200)
                  .then(response => {
                      expect(response.body.user.email).toBe('fredisgreat@test.com')
                      expect(response.body.user.username).toBe('fredisgreat')
                      done();
                  })
                  .catch(err => done(err))
    });

    it("should return 422 if not OK", (done) => {
      request(app).post("/api/users/login")
                  .send({
                    email: "fredisgreat@test.com",
                    password: "wrongpwd"
                  })
                  .expect(422)
                  .then(response => {
                      expect(response.body.message).toBe('Incorrect password.')
                      done();
                  })
                  .catch(err => {
                    done(err)
                  })
    });

  });
});
