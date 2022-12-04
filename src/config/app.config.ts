import stringService from '../modules/util/services/string.service';

const appName = stringService.capitalize(process.env.APP_NAME as string);

export default Object.freeze({
  ENCRYPTION_ALGORITHM: 'aes-256-cbc',
  HASHING_ALGORITHM: 'md5',
  AUTH_KEY: process.env.AUTH_KEY as string,
  REFRESH_KEY: process.env.REFRESH_KEY as string,
  ACCESS_TOKEN_EXPIRATION_TIME: '1d',
  REFRESH_TOKEN_EXPIRATION_TIME: '7d',
  NODE_ENV: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },
  loggerSources: {
    MONGOOSE: 'Mongoose',
    APP_SERVER: `${appName} Server`,
  },
});
