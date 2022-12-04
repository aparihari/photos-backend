import { Router } from 'express';

import { getUser, saveUser } from '../controllers/user.controller';

const router: Router = Router();

router.get('/', getUser);
router.post('/', saveUser);

export = router;
