import { Router } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2';
import { sessionOptions } from '../../config/session';

import { callback, login_user, check } from '../../controllers/auth/google.controller';

const router = Router();

/*
  Auth Routes - Google
  - login <GET> - Login with Google strategy
  - callback <GET> - Callback point for Google
*/

router.use(session(sessionOptions));

router.use(passport.initialize());
router.use(passport.session());

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

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }), login_user);
router.get('/callback', passport.authenticate('google', { failureRedirect: '/' }), callback);
router.get('/check', check);

const googleRouter = router;
export default googleRouter;
