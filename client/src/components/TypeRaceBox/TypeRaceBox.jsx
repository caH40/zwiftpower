import React from 'react';

import { raceTypes } from '../../assets/zwift/race-type';

function TypeRaceBox({ event = {} }) {
  const typeRaceCustom = raceTypes.find((type) => type.value === event.typeRaceCustom)?.name;
  return <>{typeRaceCustom}</>;
}

export default TypeRaceBox;
