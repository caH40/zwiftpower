import React from 'react';

import { roundValue } from '../../../utils/round';

import styles from './Td.module.css';
import HighlightValueMax from './HighlightValueMax';

function TdWattsPerKg({ valueRaw, valueAddition }) {
  const valueRounded = roundValue(valueAddition, 'ten');

  return (
    <td className={styles.cursor__default}>
      <HighlightValueMax
        valueCPRounded={valueRounded}
        dimensionValue={'вт/кг'}
        valueRaw={valueRaw}
      />
    </td>
  );
}

export default TdWattsPerKg;
