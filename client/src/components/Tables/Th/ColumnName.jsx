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

const ColumnName = ({ columnName }) => {
  /* eslint-disable */
  switch (columnName) {
    case 'Дата':
      return <IconDateTime tooltip={columnName} />;

    case 'Название':
      return <IconTitle tooltip={columnName} />;

    case 'Подъем':
      return <IconParamsAscent tooltip={columnName} />;

    case 'Расстояние':
      return <IconParamsDistance tooltip={columnName} />;

    case 'Длительность':
      return <IconParamsDuration tooltip={columnName} />;

    case 'Время':
      return <IconParamsDuration tooltip={columnName} />;

    case 'Круги':
      return <IconParamsLap tooltip={columnName} />;

    case 'Маршрут':
      return <IconParamsRoute tooltip={columnName} />;

    case 'Карта':
      return <IconParamsWorld tooltip={columnName} />;

    case 'Зарегистрировались':
      return <IconRegistered tooltip={columnName} />;

    case 'Формат заезда':
      return <IconRaceType tooltip={columnName} />;

    case 'Организатор':
      return <IconCreator tooltip={columnName} />;

    case 'Категория':
      return <IconCategory tooltip={columnName} />;

    case 'Райдер':
      return <IconRider tooltip={columnName} />;

    case 'Вес':
      return <IconWeight tooltip={columnName} />;

    case 'Рост':
      return <IconHeight tooltip={columnName} />;

    case 'Возраст':
      return <IconAge tooltip={columnName} />;

    case 'Пол':
      return <IconGender tooltip={columnName} />;

    case 'Пульс':
      return <IconPulse tooltip={columnName} />;

    case 'Команда':
      return <IconTeam tooltip={columnName} />;

    case 'Управление':
      return <IconAdmin tooltip={columnName} />;

    case 'Финиш':
      return <IconFinish tooltip={columnName} />;

    case 'Отставание от лидера':
      return <IconGap tooltip={columnName} />;

    case 'Отставание от райдера впереди':
      return <IconGapPrev tooltip={columnName} />;

    case 'Средняя мощность за гонку':
      return <IconPower tooltip={columnName} />;

    case 'Удельная средняя мощность за гонку':
      return <IconPowerKg tooltip={columnName} />;

    case 'Описание':
      return <IconDescription tooltip={columnName} />;

    case 'Победа':
      return <IconCupRank tooltip={columnName} place={0} />;

    case 'Место':
      return <IconCupRank tooltip={columnName} place={0} />;

    case 'Результаты':
      return <IconResultsSmall tooltip={columnName} place={0} />;

    case 'Разное':
      return <IconDifferent tooltip={columnName} place={0} />;

    case 'Средняя скорость':
      return <IconSpeed tooltip={columnName} />;

    case 'Нормализованная мощность':
      return <IconNP tooltip={columnName} />;

    case 'Стартовые гэпы (фора)':
      return <IconGapStart tooltip={columnName} />;

    case 'Средняя мощность за интервал':
      return <IconPower tooltip={columnName} />;

    case 'Удельная средняя мощность за интервал':
      return <IconPowerKg tooltip={columnName} />;

    case 'Правила':
      return <IconRules tooltip={columnName} />;

    default:
      return columnName;
  }
  /* eslint-enable */
};

export default ColumnName;
