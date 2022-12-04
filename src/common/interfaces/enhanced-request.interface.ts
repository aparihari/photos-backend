import { Request } from 'express';

import { AppUser } from '../../modules/user/interfaces/app-user.interface';

export interface EnhancedRequest extends Request {
  file: any;
  user: AppUser;
  fingerPrint: UAParser.IResult;
}
