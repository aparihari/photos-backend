import { createLogger, format, transports } from 'winston';

import appConfig from '../../config/app.config';
import { logLevels } from '../../config/logger.config';

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint(),
  ),
  levels: logLevels,
  transports: [
    new transports.Console({
      level:
        process.env.NODE_ENV === appConfig.NODE_ENV.DEVELOPMENT
          ? process.env.DEVELOPMENT_LOG_LEVEL
          : process.env.PRODUCTION_LOG_LEVEL,
    }),
  ],
  exitOnError: false,
});

export default logger;
