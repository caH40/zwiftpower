import mongoose from 'mongoose';

import { mongodb } from './config/environment.js';
import { setTimers } from './service/timer.js';
import { errorHandler } from './errors/error.js';

// запуск подключения к БД
mongoose
  .set('strictQuery', true) //в базе будут только данные которые есть в схеме
  .connect(mongodb)
  .then(() => console.log('Connected to Mongo..')) //eslint-disable-line
  .catch((error) => errorHandler(error));

await setTimers().catch((error) => errorHandler(error));
