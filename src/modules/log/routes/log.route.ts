import { Router } from 'express';

import { log } from '../controllers/log.controller';

const router: Router = Router();

router.post('/', log);

export = router;
