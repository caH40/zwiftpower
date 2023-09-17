import mongoose from 'mongoose';

import { mongodb } from './config/environment.js';
import { setTimers } from './service/timer.js';

// запуск подключения к БД
mongoose
  .set('strictQuery', true) //в базе будут только данные которые есть в схеме
  .connect(mongodb)
  .then(() => console.log('Connected to Mongo..'))
  .catch((error) => console.log(error));

await setTimers().catch((error) => console.log(error));
