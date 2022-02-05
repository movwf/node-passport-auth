import { Request, RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

export const login_user: RequestHandler = (req, res) => {
  // Not-used
};

export const callback: RequestHandler = (req, res) => {
  const user = {
    name: 'test',
    test: 'Tester',
  };

  const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET);
  res.cookie('jwt', token);
  res.send({ result: 'OK', user: req.user });
};

export const check: RequestHandler = (req, res) => {
  res.send({ result: 'OK', is: req.isAuthenticated(), user: req.user });
};
