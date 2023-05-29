import React from 'react';

import { jerseys } from '../../asset/zwift/lib/esm/jerseys';

function JerseyBox({ jerseyId }) {
  const jersey = jerseys.find((jersey) => jersey.id === jerseyId) || {};
  return <div>{jersey.name}</div>;
}

export default JerseyBox;
