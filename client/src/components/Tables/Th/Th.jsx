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
import IconCategory from '../../icons/IconCategory';
import IconRider from '../../icons/IconRider';
import IconWeight from '../../icons/IconWeight';
import IconHeight from '../../icons/IconHeight';
import IconAge from '../../icons/IconAge';
import IconGender from '../../icons/IconGender';
import IconTeam from '../../icons/IconTeam';
import IconAdmin from '../../icons/IconAdmin';
import IconFinish from '../../icons/IconFinish';
import IconPulse from '../../icons/IconPulse';
import IconGap from '../../icons/IconGap';
import IconGapPrev from '../../icons/IconGapPrev';
import IconPower from '../../icons/IconPower';
import IconPowerKg from '../../icons/IconPowerKg';

const Th = ({ columnName }) => {
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

      case 'Время':
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

      case 'Категория':
        return <IconCategory toolTip={name} />;

      case 'Райдер':
        return <IconRider toolTip={name} />;

      case 'Вес':
        return <IconWeight toolTip={name} />;

      case 'Рост':
        return <IconHeight toolTip={name} />;

      case 'Возраст':
        return <IconAge toolTip={name} />;

      case 'Пол':
        return <IconGender toolTip={name} />;

      case 'Пульс':
        return <IconPulse toolTip={name} />;

      case 'Команда':
        return <IconTeam toolTip={name} />;

      case 'Управление':
        return <IconAdmin toolTip={name} />;

      case 'Финиш':
        return <IconFinish toolTip={name} />;

      case 'Отставание от лидера':
        return <IconGap toolTip={name} />;

      case 'Отставание от райдера впереди':
        return <IconGapPrev toolTip={name} />;

      case 'Средняя мощность за гонку':
        return <IconPower toolTip={name} />;

      case 'Относительная средняя мощность за гонку':
        return <IconPowerKg toolTip={name} />;

      case 'zp.com':
        return 'zp.com';

      case '#':
        return '#';

      default:
        return '';
    }
  };
  /* eslint-enable */
  return <th>{thHtml(columnName)}</th>;
};

export default Th;
