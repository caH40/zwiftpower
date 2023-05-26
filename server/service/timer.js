import { controlConfirmEmail } from './authentication/control-confirm-email.js';
import { controlNewPasswords } from './authentication/control-newpassword.js';
import { updateResults } from './updates/results-events.js';
import { updateScheduleEvents, updateStartInfo } from './updates/schedule-events.js';

export async function timers() {
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
}
