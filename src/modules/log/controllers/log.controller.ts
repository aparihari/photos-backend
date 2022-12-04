import { Request, Response } from 'express';

import logger from '../services/logger.service';

export const log = async (req: Request, res: Response) => {
  await logger.error(req.body);
  return res.json();
};
