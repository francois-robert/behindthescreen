import { Request } from 'express';
import * as jwt from 'express-jwt';
import { environment } from "../../../environments/environment";

function getTokenFromHeader(req: Request) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

const auth = {
  required: jwt({
    credentialsRequired: true,
    secret             : environment.jwt_secret,
    getToken           : getTokenFromHeader,
    userProperty       : 'payload',
    algorithms         : ['HS256']
  }),

  optional: jwt({
    credentialsRequired: false,
    secret             : environment.jwt_secret,
    getToken           : getTokenFromHeader,
    userProperty       : 'payload',
    algorithms         : ['HS256']
  })
};

export const authentication = auth;
