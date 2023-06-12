import React from 'react';
import { useSelector } from 'react-redux';

import { roundValue } from '../../../utils/round';

import HighlightValueMax from './HighlightValueMax';

import styles from './Td.module.css';

function TdCpWatts({ cpBestEfforts, interval }) {
  const { column } = useSelector((state) => state.filterWatts.value);

  const dimension = column === 'watts' ? 'integer' : 'ten';
  const dimensionValue = column === 'watts' ? 'вт' : 'вт/кг';
  const { value: valueRaw, addition: valueAdditionCP } =
    cpBestEfforts.find((cp) => cp.duration === interval)?.[column] || null;

  const valueCPRounded = roundValue(valueAdditionCP, dimension);

  return (
    <td className={styles.cursor__default}>
      <HighlightValueMax
        value={valueCPRounded}
        dimensionValue={dimensionValue}
        tooltip={valueRaw}
      />
    </td>
  );
}

export default TdCpWatts;
