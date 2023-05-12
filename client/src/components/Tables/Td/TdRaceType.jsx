import React from 'react';

import { raceTypes } from '../../../asset/zwift/race-type';
import RaceRuleBox from '../../RaceRuleBox/RaceRuleBox';

// nameFull:true  возвращает только название типа гонки
function TdRaceType({ typeRaceCustom, nameFull }) {
  const { name, label } = raceTypes.find((type) => type.value === typeRaceCustom);
  return (
    <>
      {nameFull ? (
        <span> {name} </span>
      ) : (
        <td>
          <RaceRuleBox label={label} name={name} />
        </td>
      )}
    </>
  );
}

export default TdRaceType;
