import { controlConfirmEmail } from './authentication/control-confirm-email.js';
import { controlNewPasswords } from './authentication/control-newpassword.js';
import { updateResults } from './updates/results-events.js';
import { updateScheduleEvents, updateStartInfo } from './updates/schedule-events.js';

export async function timers() {
  try {
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const millisecondsIn30Minutes = 30 * 60 * 1000;
    const millisecondsIn10Minutes = 10 * 60 * 1000;
    setInterval(async () => {
      await controlConfirmEmail();
      await controlNewPasswords();
    }, millisecondsInDay);
    setInterval(async () => {
      await updateStartInfo();
      await updateScheduleEvents();
    }, millisecondsIn30Minutes);
    setInterval(async () => {
      await updateResults();
    }, millisecondsIn10Minutes);
    // }, millisecondsIn10Minutes);
  } catch (error) {
    console.log(error);
  }
}
