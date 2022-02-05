import jwt from 'jsonwebtoken';
import passport from 'passport';
import { RequestHandler } from 'express';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

passport.use(
  'jwt2',
  new JwtStrategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['jwt'];
        }
        return token;
      },
      secretOrKey: process.env.JWT_TOKEN_SECRET,
    },
    (payload, cb) => {
      console.log(payload);

      if (true) cb(null, { id: 1 });
      else cb(null, false);
    }
  )
);

export const login_user: RequestHandler = (req, res) => {
  const { username, password } = req.body;

  // DB
  const user = {
    name: username,
    test: 'Tester',
  };

  const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET);
  res.cookie('jwt', token);
  res.send({ result: 'OK', token });
};

export const check_user: RequestHandler = (req, res) => {
  res.send({ result: 'OK', jwtUserObject: req.user });
};
