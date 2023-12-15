import { CronJob } from 'cron';

import { controlConfirmEmail } from './authentication/control-confirm-email.js';
import { controlNewPasswords } from './authentication/control-newpassword.js';
import { updateAllPowerCurve } from './updates/power-curve.js';
import { updateResults } from './updates/results_event/results-events.js';
import { updateScheduleEvents } from './updates/schedule/events.js';
import { updateStartInfo } from './updates/schedule/start.js';
import { updateAccessToken } from './zwift/token.js';
import { errorHandler } from '../errors/error.js';
import { createSitemap } from './sitemap/generate-sitemap.js';
import {
  millisecondsInDay,
  millisecondsIn23Minutes,
  millisecondsIn5Minutes,
  millisecondsInHour,
} from '../assets/date.js';
import { addZwiftProfile } from './updates/addZwiftProfile.js';
import { removeActivityFromFitFile } from './updates/fitfiles.js';
import { updateUsers } from './updates/update-user.js';

// создание sitemap.xml
await createSitemap(); // первоначальная инициализация, чтобы сразу был после build
export async function setTimers() {
  setInterval(async () => {
    await createSitemap();
  }, millisecondsInHour);

  setInterval(async () => {
    try {
      await controlConfirmEmail();
      await controlNewPasswords();
    } catch (error) {
      errorHandler(error);
    }
  }, millisecondsInDay);

  setInterval(async () => {
    try {
      // Обновление параметров заездов в расписании (еще не стартовавших)
      await updateScheduleEvents();
      await updateStartInfo();
    } catch (error) {
      errorHandler(error);
    }
  }, millisecondsIn23Minutes);

  // обновление результатов Эвентов
  setInterval(async () => {
    try {
      await updateResults();
    } catch (error) {
      errorHandler(error);
    }
  }, millisecondsIn5Minutes);

  // запуск обновления фитфалов мощности в 2 часа каждую ночь
  new CronJob(
    '0 0 2 * * *',
    async function () {
      console.log(new Date().toLocaleString(), 'Обновление токенов и фитфайлов мощности'); // eslint-disable-line
      await removeActivityFromFitFile();
      await addZwiftProfile();
      await updateAccessToken();
      await updateAllPowerCurve();
      await updateUsers();
    },
    null,
    true,
    'Europe/Moscow'
  );
}
