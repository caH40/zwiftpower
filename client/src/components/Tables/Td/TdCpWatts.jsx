import React from 'react';
import { useSelector } from 'react-redux';

import { roundValue } from '../../../utils/round';

import HighlightValueMax from './HighlightValueMax';

function TdCpWatts({ cpBestEfforts, interval }) {
  const { column } = useSelector((state) => state.filterWatts.value);

  const dimension = column === 'watts' ? 'integer' : 'ten';
  const dimensionValue = column === 'watts' ? 'вт' : 'вт/кг';
  const valueCP = cpBestEfforts.find((cp) => cp.duration === interval)[column].addition;
  const valueCPRounded = roundValue(valueCP, dimension);

  return (
    <td>
      <HighlightValueMax value={valueCPRounded} dimensionValue={dimensionValue} />
    </td>
  );
}

export default TdCpWatts;
