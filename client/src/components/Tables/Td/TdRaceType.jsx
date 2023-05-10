import React from 'react';

import { raceTypes } from '../../../asset/zwift/race-type';
import RaceRuleBox from '../../RaceRuleBox/RaceRuleBox';

function TdRaceType({ typeRaceCustom }) {
  const { name, label } = raceTypes.find((type) => type.value === typeRaceCustom);
  return (
    <td>
      <RaceRuleBox label={label} name={name} />
    </td>
  );
}

export default TdRaceType;
