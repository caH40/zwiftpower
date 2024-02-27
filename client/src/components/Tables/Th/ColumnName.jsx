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
import IconDescription from '../../icons/IconDescription';
import IconCupRank from '../../icons/IconCupRank';
import IconResultsSmall from '../../icons/IconResultsSmall';
import IconDifferent from '../../icons/IconDifferent';
import IconSpeed from '../../icons/IconSpeed';
import IconNP from '../../icons/IconNP';
import IconGapStart from '../../icons/IconGapStart';
import IconRules from '../../icons/IconRules';

const ColumnName = ({ columnName, tooltip }) => {
  /* eslint-disable */
  switch (columnName) {
    case 'Дата':
      return <IconDateTime tooltip={tooltip || columnName} />;

    case 'Название':
      return <IconTitle tooltip={tooltip || columnName} />;

    case 'Подъем':
      return <IconParamsAscent tooltip={tooltip || columnName} />;

    case 'Расстояние':
      return <IconParamsDistance tooltip={tooltip || columnName} />;

    case 'Длительность':
      return <IconParamsDuration tooltip={tooltip || columnName} />;

    case 'Время':
      return <IconParamsDuration tooltip={tooltip || columnName} />;

    case 'Круги':
      return <IconParamsLap tooltip={tooltip || columnName} />;

    case 'Маршрут':
      return <IconParamsRoute tooltip={tooltip || columnName} />;

    case 'Карта':
      return <IconParamsWorld tooltip={tooltip || columnName} />;

    case 'Зарегистрировались':
      return <IconRegistered tooltip={tooltip || columnName} />;

    case 'Формат заезда':
      return <IconRaceType tooltip={tooltip || columnName} />;

    case 'Организатор':
      return <IconCreator tooltip={tooltip || columnName} />;

    case 'Категория':
      return <IconCategory tooltip={tooltip || columnName} />;

    case 'Райдер':
      return <IconRider tooltip={tooltip || columnName} />;

    case 'Вес':
      return <IconWeight tooltip={tooltip || columnName} />;

    case 'Рост':
      return <IconHeight tooltip={tooltip || columnName} />;

    case 'Возраст':
      return <IconAge tooltip={tooltip || columnName} />;

    case 'Пол':
      return <IconGender tooltip={tooltip || columnName} />;

    case 'Пульс':
      return <IconPulse tooltip={tooltip || columnName} />;

    case 'Команда':
      return <IconTeam tooltip={tooltip || columnName} />;

    case 'Управление':
      return <IconAdmin tooltip={tooltip || columnName} />;

    case 'Финиш':
      return <IconFinish tooltip={tooltip || columnName} />;

    case 'Отставание от лидера':
      return <IconGap tooltip={tooltip || columnName} />;

    case 'Отставание от райдера впереди':
      return <IconGapPrev tooltip={tooltip || columnName} />;

    case 'Средняя мощность за гонку':
      return <IconPower tooltip={tooltip || columnName} />;

    case 'Удельная средняя мощность за гонку':
      return <IconPowerKg tooltip={tooltip || columnName} />;

    case 'Описание':
      return <IconDescription tooltip={tooltip || columnName} />;

    case 'Победа':
      return <IconCupRank tooltip={tooltip || columnName} place={0} />;

    case 'Место':
      return <IconCupRank tooltip={tooltip || columnName} place={0} />;

    case 'Результаты':
      return <IconResultsSmall tooltip={tooltip || columnName} place={0} />;

    case 'Разное':
      return <IconDifferent tooltip={tooltip || columnName} place={0} />;

    case 'Средняя скорость':
      return <IconSpeed tooltip={tooltip || columnName} />;

    case 'Нормализованная мощность':
      return <IconNP tooltip={tooltip || columnName} />;

    case 'Стартовые гэпы (фора)':
      return <IconGapStart tooltip={tooltip || columnName} />;

    case 'Средняя мощность за интервал':
      return <IconPower tooltip={tooltip || columnName} />;

    case 'Удельная средняя мощность за интервал':
      return <IconPowerKg tooltip={tooltip || columnName} />;

    case 'Правила':
      return <IconRules tooltip={tooltip || columnName} />;

    default:
      return columnName;
  }
  /* eslint-enable */
};

export default ColumnName;
