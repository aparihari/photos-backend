import { model, Schema } from 'mongoose';

import { logType } from '../../../config/logger.config';
import messageConfig from '../../../config/message.config';
import fileService from '../../../modules/util/services/file.service';
import logger from '../../../modules/log/services/logger.service';

export const tokenSchema = new Schema({
  fingerPrint: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

tokenSchema.post(/.*/, async (result: any) => {
  logger.debug({
    message: messageConfig.DB.LOG,
    type: logType.DB.QUERY,
    details: {
      location: fileService.getFileName(__filename),
      result,
    },
  });
});

const Token = model('Token', tokenSchema);

Token.on('error', async (error) => {
  if (error.name === 'MongoError') {
    error = Object.assign({ message: error.errmsg }, error);
  }

  await logger.debug(error);
});

export default Token;
