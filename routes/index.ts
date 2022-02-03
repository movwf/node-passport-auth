import { Router } from 'express';

import googleRouter from './auth/google.router';
import localRouter from './auth/local.router';
import jwtRouter from './auth/jwt.router';

const routes = Router();

routes.use('/auth/local', localRouter);
routes.use('/auth/jwt', jwtRouter);
routes.use('/auth/google', googleRouter);

export default routes;
