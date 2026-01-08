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
import IconScoreBased from '../../icons/IconScoreBased';
import IconSeriesWorld from '../../icons/IconSeriesWorld';
import IconParticipants from '../../icons/IconParticipants';
import IconFire from '../../icons/IconFire';
import IconZPoints from '../../icons/IconZPoints';

const columnNameMap = new Map([
  ['Дата', IconDateTime],
  ['Название', IconTitle],
  ['Подъем', IconParamsAscent],
  ['Расстояние', IconParamsDistance],
  ['Длительность', IconParamsDuration],
  ['Время', IconParamsDuration],
  ['Круги', IconParamsLap],
  ['Маршрут', IconParamsRoute],
  ['Карта', IconParamsWorld],
  ['Зарегистрировались', IconRegistered],
  ['Формат заезда', IconRaceType],
  ['Организатор', IconCreator],
  ['Категория', IconCategory],
  ['Райдер', IconRider],
  ['Вес', IconWeight],
  ['Рост', IconHeight],
  ['Возраст', IconAge],
  ['Пол', IconGender],
  ['Пульс', IconPulse],
  ['Команда', IconTeam],
  ['Управление', IconAdmin],
  ['Финиш', IconFinish],
  ['Отставание от лидера', IconGap],
  ['Отставание от райдера впереди', IconGapPrev],
  ['Средняя мощность за гонку', IconPower],
  ['Удельная средняя мощность за гонку', IconPowerKg],
  ['Описание', IconDescription],
  ['Победа', IconCupRank],
  ['Место', IconCupRank],
  ['Результаты', IconResultsSmall],
  ['Разное', IconDifferent],
  ['Средняя скорость', IconSpeed],
  ['Нормализованная мощность', IconNP],
  ['Стартовые гэпы (фора)', IconGapStart],
  ['Средняя мощность за интервал', IconPower],
  ['Удельная средняя мощность за интервал', IconPowerKg],
  ['Правила', IconRules],
  ['Рейтинговые очки', IconScoreBased],
  ['Серия заездов', IconSeriesWorld],
  ['Участники', IconParticipants],
  ['Огонь', IconFire],
  ['ZPRU Очки', IconZPoints],
]);

export default function ColumnName({ columnName, tooltip, ...props }) {
  const Component = columnNameMap.get(columnName);
  return Component ? <Component tooltip={tooltip || columnName} {...props} /> : columnName;
}
