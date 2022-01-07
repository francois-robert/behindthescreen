import IUserModel, { User } from "../models/user";


export const createUser = (userObj) : IUserModel => {
    const user: IUserModel = new User();

    user.username = userObj.username;
    user.email    = userObj.email;
    user.setPassword(userObj.password);
    user.bio   = '';
    user.image = '';

    return user
}

export const createUserAndSave = (userObj) : Promise<IUserModel> => {
    return createUser(userObj).save()
}

export const createUsers = (users) : Array<IUserModel> => {
    const newArr = []
    users.map((user) => newArr.push(createUser(user)))

    return newArr
}

export const findById = (id) =>  {
    return User.findById(id)
}