import { Router } from 'express';
import multer from 'multer';

import authService from '../../../modules/auth/services/auth.service';
import {
  deletePhoto,
  getPhotos,
  savePhoto,
} from '../controllers/photo.controller';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router: Router = Router();

router.get('/', authService.isAuthenticated, getPhotos);
router.post(
  '/',
  authService.isAuthenticated,
  upload.single('photo'),
  savePhoto,
);
router.delete('/', authService.isAuthenticated, deletePhoto);

export = router;
