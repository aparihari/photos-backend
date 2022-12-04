import { Router } from 'express';

import { refreshTokens } from '../controllers/token.controller';

const router: Router = Router();

router.post('/refresh-token', refreshTokens);

export = router;
