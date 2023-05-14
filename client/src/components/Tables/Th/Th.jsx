import React from 'react';

import IconParamsAscent from '../../icons/Params/IconParamsAscent';
import IconParamsDistance from '../../icons/Params/IconParamsDistance';
import IconParamsDuration from '../../icons/Params/IconParamsDuration';
import IconParamsLap from '../../icons/Params/IconParamsLap';
import IconParamsRoute from '../../icons/Params/IconParamsRoute';
import IconParamsWorld from '../../icons/Params/IconParamsWorld';
import IconRegistered from '../../icons/IconRegistered';
import IconRaceType from '../../icons/IconRaceType';
import IconCreator from '../../icons/IconCreator';
import IconDateTime from '../../icons/IconDateTime';
import IconTitle from '../../icons/IconTitle';

const Th = ({ columnName, breakPoints }) => {
  /* eslint-disable */
  const thHtml = (name) => {
    switch (name) {
      case 'Дата':
        return <IconDateTime toolTip={name} />;

      case 'Название':
        return <IconTitle toolTip={name} />;

      case 'Подъем':
        return <IconParamsAscent toolTip={name} />;

      case 'Расстояние':
        return <IconParamsDistance toolTip={name} />;

      case 'Длительность':
        return <IconParamsDuration toolTip={name} />;

      case 'Круги':
        return <IconParamsLap toolTip={name} />;

      case 'Маршрут':
        return <IconParamsRoute toolTip={name} />;

      case 'Карта':
        return <IconParamsWorld toolTip={name} />;

      case 'Зарегистрировались':
        return <IconRegistered toolTip={name} />;

      case 'Формат заезда':
        return <IconRaceType toolTip={name} />;

      case 'Организатор':
        return <IconCreator toolTip={name} />;

      default:
        return '';
    }
  };
  /* eslint-enable */
  return <th>{thHtml(columnName)}</th>;
};

export default Th;
