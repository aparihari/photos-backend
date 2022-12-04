import { model, Schema } from 'mongoose';

import cryptoService from '../../../modules/util/services/crypto.service';
import validator from '../../../modules/db/validator';
import logger from '../../../modules/log/services/logger.service';
import { UserDocument } from '../interfaces/app-user.interface';
import messageConfig from '../../../config/message.config';
import { logType } from '../../../config/logger.config';
import fileService from '../../../modules/util/services/file.service';
import transformOption from '../../../modules/db/transform.option';

export const user = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    trim: true,
    validate: validator.get('email'),
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate: validator.get('name'),
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    validate: validator.get('name'),
  },
  password: {
    type: String,
    required: true,
    validate: validator.get('password'),
  },
});

// virtual properties
user.virtual('name').get(function (this) {
  return `${this.firstName} ${this.lastName}`;
});

user.post(/.*/, async (result: any) => {
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
transformOption.setId(user);

// instance methods
user.methods.comparePassword = function (this: any, password: string) {
  return Promise.resolve(cryptoService.decrypt(this.password) === password);
};

user.methods.withoutSensitiveDetails = function (this: any) {
  const doc = this.toObject();
  delete doc.password;
  return doc;
};

// pre upsert methods
user.pre<any>('save', function (next) {
  // only hash the password if it has been modified or is a new one
  if (!this.isModified('password')) return next();

  // save encrypted password
  this.password = cryptoService.encrypt(this.password);
  return next();
});

const User = model('User', user);

User.on('error', async (error) => {
  if (error.name === 'MongoError') {
    error = Object.assign({ message: error.errmsg }, error);
  }

  await logger.debug(error);
});

export default User;
