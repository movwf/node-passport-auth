import { SessionOptions } from 'express-session';

export const sessionOptions: SessionOptions = {
  secret: 'Test',
  resave: false,
  saveUninitialized: false,
};
