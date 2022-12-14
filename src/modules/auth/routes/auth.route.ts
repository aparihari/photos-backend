import { Router } from 'express';

import { login, signup, logout } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

export = router;
