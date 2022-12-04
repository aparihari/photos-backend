import { model, Schema } from 'mongoose';

import { logType } from '../../../config/logger.config';
import messageConfig from '../../../config/message.config';
import fileService from '../../../modules/util/services/file.service';
import logger from '../../../modules/log/services/logger.service';
import transformOption from '../../../modules/db/transform.option';

export const photo = new Schema({
  data: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

photo.post(/.*/, async (result: any) => {
  logger.debug({
    message: messageConfig.DB.LOG,
    type: logType.DB.QUERY,
    details: {
      location: fileService.getFileName(__filename),
      result,
    },
  });
});

// set transformations
transformOption.setId(photo);

const Photo = model('Photo', photo);

Photo.on('error', async (error) => {
  if (error.name === 'MongoError') {
    error = Object.assign({ message: error.errmsg }, error);
  }

  await logger.debug(error);
});

export default Photo;
