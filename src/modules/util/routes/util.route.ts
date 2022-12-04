import { Router } from 'express';

import cryptRoutes from './child/crypto.route';
import fileRoutes from './child/file.route';

const router: Router = Router();

// file related utilities
router.use('/file', fileRoutes);

// cryptography related utilities
router.use('/crypto', cryptRoutes);

export = router;
