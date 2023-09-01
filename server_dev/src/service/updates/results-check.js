export async function checkDurationUpdating(event) {
  try {
    const millisecondsIn2Hours = 2 * 60 * 60 * 1000; // длительность обновления результатов
    const eventStart = new Date(event.eventStart).getTime();
    const timeCurrent = new Date().getTime();
    if (timeCurrent - eventStart > millisecondsIn2Hours) {
      event.hasResults = true;
      await event.save();
    }
  } catch (error) {
    console.error(error);
  }
}
