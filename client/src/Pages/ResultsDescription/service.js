import { gapValue } from '../../utils/gap';
import { filterThousandths } from '../../utils/thousandths-seconds';
import { setValueMax } from '../../utils/value-max';

export function prepareResults(results) {
  try {
    // const resultsWithGap = gapValue([...results]);
    // const resultsWithThousandths = filterThousandths([...resultsWithGap]);
    // const resultsPrepared = setValueMax([...resultsWithThousandths]);
    return results;
  } catch (error) {
    throw error;
  }
}
