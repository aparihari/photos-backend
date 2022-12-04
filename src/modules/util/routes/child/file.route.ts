import { Router } from 'express';
import multer from 'multer';

import {
  getBase64EncodedContent,
  getBase64DecodedContent,
} from '../../controllers/file.controller';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router: Router = Router();

router.post(
  '/image_base64_encode',
  upload.single('file'),
  getBase64EncodedContent,
);
router.post('/image_base64_decode', getBase64DecodedContent);

export = router;
