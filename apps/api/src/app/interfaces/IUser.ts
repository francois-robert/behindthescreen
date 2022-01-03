import User from "../models/User";

export interface IUser {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  following: User[];
}

