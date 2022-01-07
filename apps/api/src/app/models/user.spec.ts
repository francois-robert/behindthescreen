import IUserModel, { User } from "./user";
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

describe("User model", () => {
    const testPassword = "testpwd"

    describe("validPassword(password)", () => {
        
        it("should call crypto.pbkdf2Sync", () => {
            const user: IUserModel = new User();
            const spy = jest.spyOn(crypto, 'pbkdf2Sync')

            user.setPassword(testPassword);
            user.validPassword(testPassword);
            expect(spy).toHaveBeenCalled();
        })

        it("should validate password", () => {
            const user: IUserModel = new User();

            user.setPassword(testPassword);
            expect(user.validPassword(testPassword)).toBe(true);
        })
    })

    describe("setPassword(password)", () => {
        it("should call crypto.randomBytes and crypto.pbkdf2Sync", () => {
            const user: IUserModel = new User();
            const spy = jest.spyOn(crypto, 'pbkdf2Sync')
            const spy2 = jest.spyOn(crypto, 'randomBytes')

            user.setPassword(testPassword);
            expect(spy).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
        })
    })

    describe("generateJWT()", () => {
        it("should call jwt.sign and return its results", () => {
            const user: IUserModel = new User();
            const testJWT = "testJWT"
            const spy = jest.spyOn(jwt, 'sign').mockImplementation(() => testJWT)

            expect(user.generateJWT()).toBe(testJWT);
            expect(spy).toHaveBeenCalled();
        })
    })

    describe("toAuthJSON()", () => {

        it("should call this.generateJWT", () => {
            const user: IUserModel = new User();
            const spy = jest.spyOn(user, 'generateJWT')

            user.toAuthJSON()
            expect(spy).toHaveBeenCalled();
        })

        it("should return object with JWT", () => {
            const user: IUserModel = new User({username: "toto", email: "test@caramail.fr", bio: "this is my life", image: "mycatimage.jpg"});

            const testJWT = "testJWT"
            jest.spyOn(user, 'generateJWT').mockImplementation(() => testJWT)

            expect(JSON.stringify(user.toAuthJSON())).toBe(JSON.stringify({
                username: user.username,
                email   : user.email,
                token   : testJWT,
                bio     : user.bio,
                image   : user.image
            }));
        })
    })

})