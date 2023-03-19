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
} from '../controllers/authentication.js';

export const routerAuth = new Router();

routerAuth.post('/registration', registration);
routerAuth.post('/authorization', authorization);
routerAuth.post('/logout', logout);
routerAuth.get('/check', checkAuth);
routerAuth.post('/refresh', refresh);
routerAuth.put('/confirm-email', confirmEmail);
routerAuth.put('/reset-password', resetPassword);
routerAuth.get('/check-request-password/:token', checkRequestPassword);
routerAuth.put('/new-password', newPassword);
