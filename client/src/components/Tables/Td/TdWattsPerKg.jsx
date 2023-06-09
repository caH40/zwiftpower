import React from 'react';

import { roundValueToTenths } from '../utils/td';

import styles from './Td.module.css';
import HighlightValueMax from './HighlightValueMax';

function TdWattsPerKg({ valueRaw, valueAddition }) {
  const valueRounded = roundValueToTenths(valueAddition);

  return (
    <td className={styles.cursor__default}>
      <HighlightValueMax value={valueRounded} dimensionValue={'вт/кг'} tooltip={valueRaw} />
    </td>
  );
}

export default TdWattsPerKg;
