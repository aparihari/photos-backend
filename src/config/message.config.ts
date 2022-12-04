import stringService from '../modules/util/services/string.service';

const messageConfig = Object.freeze({
  API: {
    REQUEST: 'API REQUEST',
    RESPONSE: 'API RESPONSE',
  },
  DB: {
    LOG: 'DB QUERY',
    CONNECTION_SUCCESS: 'Successfully connected to MongoDB!',
    CONNECTION_ERROR: 'Error connecting to the database',
    CLOSE_SUCCESS: 'Successfully closed current connection to MongoDB!',
    CLOSE_ERROR: `Couldn't close current connection to MongoDB!`,
    savedDocument(collection: string, name: string) {
      return `Saved ${stringService.capitalize(collection)}: ${name}`;
    },
  },
  AUTH: {
    ACCESS_DENIED: 'Access Denied',
    UNAUTHORIZED: 'Unauthorized',
    INVALID_LOGIN: 'Invalid Login',
  },
  TOKEN: {
    INVALID_TOKEN: 'Invalid Token',
    TOKENS_DELETED: 'Tokens Deleted Successfully',
  },
});

export default messageConfig;
