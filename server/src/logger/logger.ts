import path from 'path';
import winston, { format } from 'winston';

import { getTimerLocal } from '../utils/date-local.js';

// types
import { LogsErrorSchema } from '../types/model.interface.js';

const __dirname = path.resolve();
const filename = path.join(__dirname, 'src/logs/error', 'errors.log');

const optionsFile = {
  filename,
  level: 'error',
  maxsize: 5242880, // 5MB
  maxFiles: 5,
};

//
// формирования логирования ошибок в файл
//
export const logError = (errorParsed: Omit<LogsErrorSchema, 'timestamp'>) => {
  const logger = winston.createLogger({
    format: format.json(),
    transports: [new winston.transports.File(optionsFile)],
  });

  logger.log('error', { timestamp: getTimerLocal(Date.now(), 'DDMMYYHm'), ...errorParsed });
};
