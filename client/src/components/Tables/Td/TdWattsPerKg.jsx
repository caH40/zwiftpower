import React from 'react';

import { roundValue } from '../../../utils/round';

import styles from './Td.module.css';
import HighlightValueMax from './HighlightValueMax';

function TdWattsPerKg({ valueRaw, valueAddition }) {
  const valueRounded = roundValue(valueAddition, 'hundred');

  return (
    <td>
      <HighlightValueMax
        valueCPRounded={valueRounded}
        dimensionValue={'вт/кг'}
        valueRaw={valueRaw}
      />
    </td>
  );
}

export default TdWattsPerKg;
