import { controlConfirmEmail } from './authentication/control-confirm-email.js';
import { controlNewPasswords } from './authentication/control-newpassword.js';
import { scheduleEvents } from './schedule-events.js';

export async function timers() {
  try {
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const millisecondsInHour = 60 * 60 * 1000;
    setInterval(async () => {
      await controlConfirmEmail();
      await controlNewPasswords();
    }, millisecondsInDay);
    setInterval(async () => {
      await scheduleEvents();
    }, millisecondsInHour);
  } catch (error) {
    console.log(error);
  }
}
