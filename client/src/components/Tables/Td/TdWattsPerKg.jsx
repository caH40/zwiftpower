import { roundValue } from '../../../utils/round';

import HighlightValueMax from './HighlightValueMax';

function TdWattsPerKg({ valueAddition }) {
  const valueRounded = roundValue(valueAddition, 'hundred');

  return (
    <td>
      <HighlightValueMax valueCPRounded={valueRounded} dimensionValue={'вт/кг'} />
    </td>
  );
}

export default TdWattsPerKg;
