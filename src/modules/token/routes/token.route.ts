import { Router } from 'express';

import { refreshTokens, rejectTokens } from '../controllers/token.controller';

const router: Router = Router();

router.post('/refresh-token', refreshTokens);
router.post('/reject-token', rejectTokens);

export = router;
