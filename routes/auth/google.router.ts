import { Router } from 'express';
import passport from 'passport';

import { callback, login_user } from '../../controllers/auth/google.controller';

const router = Router();

/*
  Auth Routes - Google
  - login <GET> - Login with Google strategy
  - callback <GET> - Callback point for Google
*/

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }), login_user);
router.get('/callback', passport.authenticate('google'), callback);

const googleRouter = router;
export default googleRouter;
