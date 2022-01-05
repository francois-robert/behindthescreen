import User from "../models/user";

export interface IUser {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  following: User[];
}

