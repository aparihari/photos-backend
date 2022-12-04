import { Router } from 'express';

import {
  encryptText,
  decryptText,
  createHash,
} from '../../controllers/crypto.controller';

const router: Router = Router();

router.post('/encrypt', encryptText);
router.post('/decrypt', decryptText);
router.post('/hash', createHash);

export = router;
