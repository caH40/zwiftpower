import { addNull } from '../../../utils/date-convert';

/**
 * Изменение всех времён в настройках групп (регистрация, конец регистрации, старт ...)
 * Мутация временных точек
 */
export function changeTime(subGroup) {
  if (!subGroup) return;

  subGroup.lineUpEnd = subGroup.eventSubgroupStart;
  subGroup.registrationEnd = subGroup.eventSubgroupStart;

  const date = subGroup.eventSubgroupStart.slice(0, 11);
  const timeArray = subGroup.eventSubgroupStart.slice(11, 19).split(':');

  const minutes = Number(timeArray[0] * 60) + Number(timeArray[1]);
  const seconds = String(timeArray[2]);

  subGroup.lineUpStart = date + countGap(minutes, seconds, 5);
  subGroup.registrationStart = date + countGap(minutes, seconds, 30);
}

/**
 * Формирование строки времени для специфичных точек времени в настройках
 * (время начала регистрации (registrationStart) и lineUpStart)
 * @param {number} timeInMinutes общее количество минут (с учетом часов)
 * @param {string} seconds строка показывающая количество секунд во времени
 * @param {number} gap гэп в минутах от старта (стандартные величины 5 и 30 минут)
 * @returns
 */
function countGap(timeInMinutes, seconds, gap) {
  const hour = addNull(Math.trunc((timeInMinutes - gap) / 60));
  const minutes = addNull(timeInMinutes - gap - hour * 60);
  return `${hour}:${minutes}:${seconds}.000+0000`;
}
