import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user-interface';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as mongooseUniqueValidator from 'mongoose-unique-validator'
import { environment } from "../../../environments/environment";


export default interface IUserModel extends IUser, Document {
  token?: string;

  generateJWT(): string;
  toAuthJSON(): Record<string, unknown>;
  setPassword(password: string): void;
  validPassword(password: string): boolean;
  toProfileJSONFor(user: IUserModel): Record<string, unknown>;
}


// ISSUE: Own every parameter and any missing dependencies
const UserSchema = new Schema({
  username : {
    type     : Schema.Types.String,
    lowercase: true,
    unique   : true,
    required : [true, "can't be blank"],
    match    : [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index    : true
  },
  email    : {
    type     : Schema.Types.String,
    lowercase: true,
    unique   : true,
    required : [true, "can't be blank"],
    match    : [/\S+@\S+\.\S+/, 'is invalid'],
    index    : true
  },
  bio      : {
    type: Schema.Types.String
  },
  image    : {
    type: Schema.Types.String
  },
  hash     : {
    type: Schema.Types.String
  },
  salt     : {
    type: Schema.Types.String
  },
}, {timestamps: true});


UserSchema.plugin(mongooseUniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function (): string {
  const today = new Date();
  const exp   = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id      : this._id,
    username: this.username,
    exp     : exp.getTime() / 1000,
  }, environment.jwt_secret);
};


UserSchema.methods.toAuthJSON = function(): Record<string, unknown> {
  return {
    username: this.username,
    email   : this.email,
    token   : this.generateJWT(),
    bio     : this.bio,
    image   : this.image
  };
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);