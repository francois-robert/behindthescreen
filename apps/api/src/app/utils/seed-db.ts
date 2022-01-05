import { createUser } from '../controller/user-controller';
import { User } from '../models/user';

const seedUsers = [
    {
        username: "fredisgreat",
        email: "fredisgreat@test.com",
        password: "strongpwd"
    },

    {
        username: "bob12",
        email: "bob12@test.com",
        password: "strongpwd"
    }
]

export const seedDatabase = async () => {
    await User.deleteMany({});
    await seedUsers.forEach(e => createUser(e));
};
