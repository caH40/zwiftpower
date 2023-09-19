import React from 'react';

import { jerseys } from '../../assets/zwift/lib/esm/jerseys';

function JerseyBox({ jerseyId }) {
  const jersey = jerseys.find((jersey) => jersey.id === jerseyId) || {};
  return <div>{jersey.name ?? 'не выбрано'}</div>;
}

export default JerseyBox;
