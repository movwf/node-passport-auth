import passport from 'passport';
import { RequestHandler } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy((username, password, cb) => {
    // Execute DB Comparison Functions <here>
    if (username === 'test' && password === 'test') {
      /*
        On Successful Validation 
        -> Populate user object in here

        "cookie": {
          ... cookie infos
        },
        "passport": {
          <This is the returned object>
          "user": {
            "username": "test"
          }
        }
      */
      return cb(null, { username: username }); // cb(null,a)
    } else return cb(null, false, { message: 'Incorrect username or password!' });
  })
);

// a is what local strategy returns in second argument
// (a, cb) => .... => cb(null, a)
passport.serializeUser((user, cb) => process.nextTick(() => cb(null, user)));
passport.deserializeUser((user, cb) => process.nextTick(() => cb(null, user)));

export const login_user: RequestHandler = (req, res) => {
  // It's created by successful cb return @ Local Strategy initialization
  res.send(req.user);
};

export const check_user: RequestHandler = (req, res) => {
  res.send({ session: req.session });
};
