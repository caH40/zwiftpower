import { CronJob } from 'cron';

import { controlConfirmEmail } from './authentication/control-confirm-email.js';
import { controlNewPasswords } from './authentication/control-newpassword.js';
import { updateAllPowerCurve } from './updates/power-curve.js';
import { updateResults } from './updates/results-events.js';
import { updateScheduleEvents, updateStartInfo } from './updates/schedule-events.js';
import { updateAccessToken } from './zwift/token.js';
import { errorHandler } from '../errors/error.js';
import { createSitemap } from './sitemap/generate-sitemap.js';
import {
  millisecondsIn90Days,
  millisecondsIn23Minutes,
  millisecondsIn12Minutes,
  millisecondsIn10Minutes,
} from '../assets/date.js';

// создание sitemap.xml
await createSitemap(); // первоначальная инициализация, чтобы сразу был после build
export async function setTimers() {
  setInterval(async () => {
    await createSitemap();
  }, millisecondsIn10Minutes);

  setInterval(async () => {
    try {
      await controlConfirmEmail();
      await controlNewPasswords();
    } catch (error) {
      errorHandler(error);
    }
  }, millisecondsIn90Days);

  setInterval(async () => {
    try {
      await updateScheduleEvents();
      await updateStartInfo();
    } catch (error) {
      errorHandler(error);
    }
  }, millisecondsIn23Minutes);

  setInterval(async () => {
    try {
      await updateResults();
    } catch (error) {
      errorHandler(error);
    }
  }, millisecondsIn12Minutes);

  // запуск обновления фитфалов мощности в 2 часа каждую ночь
  new CronJob(
    '0 0 2 * * *',
    async function () {
      console.log(new Date().toLocaleString(), 'Обновление токенов и фитфайлов мощности'); // eslint-disable-line
      await updateAccessToken();
      await updateAllPowerCurve();
    },
    null,
    true,
    'Europe/Moscow'
  );
}
