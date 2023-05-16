import { controlConfirmEmail } from './authentication/control-confirm-email.js';
import { controlNewPasswords } from './authentication/control-newpassword.js';
import { updateResults } from './updates/results-events.js';
import { updateScheduleEvents, updateStartInfo } from './updates/schedule-events.js';

export async function timers() {
  try {
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const millisecondsIn23Minutes = 23 * 60 * 1000;
    const millisecondsIn12Minutes = 12 * 60 * 1000;
    setInterval(async () => {
      await controlConfirmEmail();
      await controlNewPasswords();
    }, millisecondsInDay);
    setInterval(async () => {
      await updateScheduleEvents();
      await updateStartInfo();
    }, millisecondsIn23Minutes);
    setInterval(async () => {
      await updateResults();
    }, millisecondsIn12Minutes);
  } catch (error) {
    console.log(error);
  }
}
