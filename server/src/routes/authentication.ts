import { Router } from 'express';
import {
  registration,
  authorization,
  logout,
  checkAuth,
  refresh,
  confirmEmail,
  resetPassword,
  checkRequestPassword,
  newPassword,
  registrationVKID,
  authorizationVKID,
  linkVKID,
} from '../controllers/authentication.js';
import { checkAuth as checkAuthMiddleware } from '../middleware/auth.js';

export const routerAuth = Router();

routerAuth.post('/registration', registration);
routerAuth.post('/authorization', authorization);
routerAuth.post('/logout', logout);
routerAuth.get('/check', checkAuth);
routerAuth.post('/refresh', refresh);
routerAuth.put('/confirm-email', confirmEmail);
routerAuth.put('/reset-password', resetPassword);
routerAuth.get('/check-request-password/:token', checkRequestPassword);
routerAuth.put('/new-password', newPassword);

routerAuth.post('/registration/vk', registrationVKID);
routerAuth.post('/authorization/vk', authorizationVKID);
routerAuth.post('/link/vk', checkAuthMiddleware, linkVKID);
