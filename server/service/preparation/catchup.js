import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addPropertyMaxValues } from '../../utility/property-max.js';

export async function getResultsCatchup(event) {
  try {
    const resultsDB = await ZwiftResult.find({ zwiftEventId: event._id });
    const results = resultsDB.map((result) => result.toObject());

    results.sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

    const resultsWithMaxValues = addPropertyMaxValues(results);

    event.results = resultsWithMaxValues;

    return event;
  } catch (error) {
    console.error(error);
  }
}
