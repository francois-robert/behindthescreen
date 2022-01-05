import IUserModel, { User } from "../models/user";


export const createUser = (userObj) : Promise<IUserModel> => {
    const user: IUserModel = new User();

    user.username = userObj.username;
    user.email    = userObj.email;
    user.setPassword(userObj.password);
    user.bio   = '';
    user.image = '';

    return user.save()
}
