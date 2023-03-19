import { controlConfirmEmail } from './authentication/control-confirm-email.js';
import { controlNewPasswords } from './authentication/control-newpassword.js';

export async function timers() {
	try {
		const millisecondsInDay = 24 * 60 * 60 * 1000;
		setInterval(async () => {
			await controlConfirmEmail();
			await controlNewPasswords();
		}, millisecondsInDay);
	} catch (error) {
		console.log(error);
	}
}
