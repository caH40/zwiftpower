import { CronJob } from 'cron';

import { controlConfirmEmail } from './authentication/control-confirm-email.js';
import { controlNewPasswords } from './authentication/control-newpassword.js';
import { updateAllPowerCurve } from './updates/power-curve.js';
import { updateResults } from './updates/results-events.js';
import { updateScheduleEvents, updateStartInfo } from './updates/schedule-events.js';
import { updateAccessToken } from './zwift/token.js';

export async function setTimers() {
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsIn23Minutes = 23 * 60 * 1000;
  const millisecondsIn12Minutes = 12 * 60 * 1000;
  setInterval(async () => {
    try {
      await controlConfirmEmail();
      await controlNewPasswords();
    } catch (error) {
      console.log(error);
    }
  }, millisecondsInDay);

  setInterval(async () => {
    try {
      await updateScheduleEvents();
      await updateStartInfo();
    } catch (error) {
      console.log(error);
    }
  }, millisecondsIn23Minutes);

  setInterval(async () => {
    try {
      await updateResults();
    } catch (error) {
      console.log(error);
    }
  }, millisecondsIn12Minutes);

  // запуск обновления фитфалов мощности в 2 часа каждую ночь
  new CronJob(
    '0 0 2 * * *',
    async function () {
      console.log(new Date().toLocaleString(), 'Обновление токенов и фитфайлов мощности');
      await updateAccessToken();
      await updateAllPowerCurve();
    },
    null,
    true,
    'Europe/Moscow'
  );
}
