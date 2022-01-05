import * as mongoose from 'mongoose';
import { User } from '../models/user';

const db = mongoose.connection;

const seedUsers = [
    {
        username: "toto",
        email: "toto@gmail.com",
        password: "strongpwd"
    },

    {
        username: "titi",
        email: "titi@gmail.com",
        password: "strongpwd"
    }
]

export const seedDatabase = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
};
