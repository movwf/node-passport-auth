import { Request, RequestHandler } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2';

const strategyCB: VerifyFunctionWithRequest = (req, accessToken, refreshToken, profile, cb) => {
  const fakeId = profile.id;

  const userObj = {
    accessToken,
    refreshToken,
    profile,
  };

  if (profile.id === fakeId) return cb(null, userObj);
  else return cb(null, false);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
      passReqToCallback: true,
    },
    strategyCB
  )
);

passport.serializeUser((user, cb) => process.nextTick(() => cb(null, user)));
passport.deserializeUser((user, cb) => process.nextTick(() => cb(null, user)));

export const login_user: RequestHandler = (req, res) => {
  // Not-used
};

export const callback: RequestHandler = (req, res) => {
  res.send({ result: 'OK', user: req.user });
  res.redirect('/');
};
