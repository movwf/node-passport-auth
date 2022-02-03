import jwt from 'jsonwebtoken';
import passport from 'passport';
import { RequestHandler } from 'express';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

const signJWT = (dataObj: Object) =>
  jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60,
      data: dataObj,
    },
    process.env.JWT_TOKEN_SECRET
  );

passport.use(
  new BearerStrategy((token, cb) => {
    /* 
      token is automatically aquired by 
      - Authorization(Header)
      - access_token (Body)
      - access_token (Query)
    */

    const fakeToken = token;
    /*
      Check your JWT token in user or another(session) table
      and return user object on second argument.
      done(null, user)
    */
    const fakeUserObject = {
      username: 'test',
      name: 'Tester',
    };

    if (token === fakeToken) return cb(null, fakeUserObject, { scope: 'all' });
    else return cb(null, false);
  })
);

export const login_user: RequestHandler = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (username === 'test' && password === 'test') {
    const userObj = {
      username,
      name: 'Tester',
      insideJWT: true,
    };

    const token = signJWT(userObj);

    res.send({
      result: 'OK',
      token,
    });
  } else {
    res.status(401).send({ result: 'Error', message: 'Incorrect user or password.' });
  }
};

export const check_user: RequestHandler = (req, res) => {
  /* 
  
    req.user -> cb(null, user) => user object sent by Bearer Strategy

      {
        "result": "OK",
        "jwtUserObject": {
            "username": "test",
            "name": "Tester"
        }
      }
  */
  res.send({ result: 'OK', jwtUserObject: req.user });
};
