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
import IconRules from '../../icons/IconRules';
import IconGapStart from '../../icons/IconGapStart';
import IconSpeed from '../../icons/IconSpeed';

const Th = ({ columnName }) => {
  /* eslint-disable */
  const thHtml = (name) => {
    switch (name) {
      case 'Дата':
        return <IconDateTime tooltip={name} />;

      case 'Название':
        return <IconTitle tooltip={name} />;

      case 'Подъем':
        return <IconParamsAscent tooltip={name} />;

      case 'Расстояние':
        return <IconParamsDistance tooltip={name} />;

      case 'Длительность':
        return <IconParamsDuration tooltip={name} />;

      case 'Время':
        return <IconParamsDuration tooltip={name} />;

      case 'Круги':
        return <IconParamsLap tooltip={name} />;

      case 'Маршрут':
        return <IconParamsRoute tooltip={name} />;

      case 'Карта':
        return <IconParamsWorld tooltip={name} />;

      case 'Зарегистрировались':
        return <IconRegistered tooltip={name} />;

      case 'Формат заезда':
        return <IconRaceType tooltip={name} />;

      case 'Организатор':
        return <IconCreator tooltip={name} />;

      case 'Категория':
        return <IconCategory tooltip={name} />;

      case 'Райдер':
        return <IconRider tooltip={name} />;

      case 'Вес':
        return <IconWeight tooltip={name} />;

      case 'Рост':
        return <IconHeight tooltip={name} />;

      case 'Возраст':
        return <IconAge tooltip={name} />;

      case 'Пол':
        return <IconGender tooltip={name} />;

      case 'Пульс':
        return <IconPulse tooltip={name} />;

      case 'Команда':
        return <IconTeam tooltip={name} />;

      case 'Управление':
        return <IconAdmin tooltip={name} />;

      case 'Финиш':
        return <IconFinish tooltip={name} />;

      case 'Отставание от лидера':
        return <IconGap tooltip={name} />;

      case 'Отставание от райдера впереди':
        return <IconGapPrev tooltip={name} />;

      case 'Стартовые гэпы (фора)':
        return <IconGapStart tooltip={name} />;

      case 'Средняя мощность за гонку':
        return <IconPower tooltip={name} />;

      case 'Средняя мощность за интервал':
        return <IconPower tooltip={name} />;

      case 'Удельная средняя мощность за гонку':
        return <IconPowerKg tooltip={name} />;

      case 'Удельная средняя мощность за интервал':
        return <IconPowerKg tooltip={name} />;

      case 'Описание':
        return <IconDescription tooltip={name} />;

      case 'Победа':
        return <IconCupRank tooltip={name} place={0} />;

      case 'Результаты':
        return <IconResultsSmall tooltip={name} />;

      case 'Разное':
        return <IconDifferent tooltip={name} />;

      case 'Правила':
        return <IconRules tooltip={name} />;

      case 'Средняя скорость':
        return <IconSpeed tooltip={name} />;

      default:
        return name;
    }
  };
  /* eslint-enable */
  return <th>{thHtml(columnName)}</th>;
};

export default Th;
