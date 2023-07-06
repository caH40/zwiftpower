import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { addPropertyAddition } from '../../utility/property-addition.js';
import { secondesToTimeThousandths } from '../../utility/thousandths.js';
import { filterByRank } from '../protocol/newbies/results-filter.js';

export async function getResultsNewbies(event) {
  try {
    const resultsDB = await ZwiftResult.find({ zwiftEventId: event._id });
    const results = resultsDB.map((result) => result.toObject());

    const resultsFiltered = filterByRank(results);

    const resultsWithMaxValues = addPropertyAddition(resultsFiltered);

    // добавление строки времени в addition durationInMilliseconds
    for (const result of resultsFiltered) {
      result.activityData.durationInMilliseconds.addition = secondesToTimeThousandths(
        result.activityData.durationInMilliseconds.value
      );
    }

    event.results = resultsFiltered;

    return event;
  } catch (error) {
    console.error(error);
  }
}
