import { Router } from 'express';
import passport from 'passport';

import { check_user, login_user } from '../../controllers/auth/jw2.controller';

const router = Router();

/*
  Auth Routes - JWT
  - login <POST> - Login with JWT strategy
  - check <GET> - Check your JWT
*/

router.get('/check', passport.authenticate('jwt2', { session: false }), check_user);
router.post('/login', login_user);

const jwtRouter = router;
export default jwtRouter;
