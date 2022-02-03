import session from 'express-session';
import { Router } from 'express';
import passport from 'passport';

import { sessionOptions } from '../../config/session';
import { login_user, check_user } from '../../controllers/auth/local.controller';

const router = Router();

router.use(session(sessionOptions));

/*
  Auth Routes - Local
  - login <POST> - Login with local strategy
  - check <GET> - Check your session
*/

router.get('/check', check_user);
router.post('/login', passport.authenticate('local'), login_user);

const authRouter = router;
export default authRouter;
