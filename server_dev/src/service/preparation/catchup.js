import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { secondesToTimeThousandths } from '../../utility/thousandths.js';
import { addPropertyAddition } from '../../utility/property-addition.js';

export async function getResultsCatchup(event) {
  try {
    const resultsDB = await ZwiftResult.find({ zwiftEventId: event._id });
    const results = resultsDB.map((result) => result.toObject());

    results.sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

    const resultsWithMaxValues = addPropertyAddition(results);

    // добавление строки времени в addition durationInMilliseconds
    for (const result of resultsWithMaxValues) {
      result.activityData.durationInMilliseconds.addition = secondesToTimeThousandths(
        result.activityData.durationInMilliseconds.value
      );
    }

    event.results = resultsWithMaxValues;

    return event;
  } catch (error) {
    console.error(error);
  }
}
