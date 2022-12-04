export type LogLevel =
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

export const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

export const logType = Object.freeze({
  DB: {
    QUERY: 'DB Query',
  },
  API: {
    REQUEST: 'API Request',
    RESPONSE: 'API Response',
  },
});
