import React from 'react';

import { getMinutesString } from '../../utils/declination';

function GapBox({ groupLabel, gaps }) {
  const minutes = gaps[groupLabel];
  return <> {minutes === 0 ? 'начало заезда' : `+${getMinutesString(minutes)}`}</>;
}

export default GapBox;
