import { ZwiftResult } from '../../Model/ZwiftResult.js';

export async function getResultsCatchup(event) {
  try {
    const resultsDB = await ZwiftResult.find({ zwiftEventId: event._id });

    resultsDB.sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

    event.results = resultsDB;

    return event;
  } catch (error) {
    console.error(error);
  }
}
