import {
  optionPrivate,
  optionsCulling,
  optionsEventType,
} from '../../../assets/select/event-edit';
import { routes } from '../../../assets/zwift/lib/esm/routes';
import { jerseys } from '../../../assets/zwift/raw/jerseys';
import { rules } from '../../../assets/zwift/rule';
import { tags } from '../../../assets/zwift/tags';
import { getTimerLocal } from '../../../utils/date-local';
import { distanceObject, map, routeName } from '../../../utils/event';

/**
 * Создаёт подробное описание настроек для эвента и для каждой группы.
 * @param {object} eventParams - Параметры эвента.
 * @returns {string} - Подробное описание настроек для эвента и каждой группы.
 */
export const createDescription = (eventParams) => {
  // Создаёт описание настроек Эвента
  const club = `Клуб: <b>${eventParams.clubName}</b>`;

  const categoryEnforcement = `Строгая категоризация: <b>${
    eventParams.categoryEnforcement ? 'Включена' : 'Выключена'
  }</b>`;

  const eventType = `Тип заезда: <b>${
    optionsEventType.find((elm) => elm.name === eventParams.eventType)?.translate
  }</b>`;

  const microserviceEventVisibility = `Приватность заезда: <b>${
    optionPrivate.find((elm) => elm.name === eventParams.microserviceEventVisibility)?.translate
  }</b>`;

  const cullingType = `Видимость райдеров: <b>${
    optionsCulling.find((elm) => elm.name === eventParams.cullingType)?.translate
  }</b>`;

  const rulesSet = eventParams.rulesSet
    .map((rule) => `- <b>${rules.find((elm) => elm.value === rule)?.translate || rule}</b>\n`)
    .join('');

  const tagsSet = eventParams.eventSubgroups[0]?.tags
    .filter((elm) => !elm.includes('timestamp'))
    .map((tag) => `- <b>${tags.find((elm) => elm.value === tag)?.translate || tag}</b>\n`)
    .join('');

  const event = `${club}
  ${eventType}
  ${microserviceEventVisibility}
  ${categoryEnforcement}
  ${cullingType}
  ${'Правила:'}
  ${rulesSet}${tagsSet}`;

  // Создаёт описание настроек всех подгрупп
  let strGroups = '';
  if (eventParams.eventSubgroups) {
    for (const subgroup of eventParams.eventSubgroups) {
      // объект с описанием дистанции, кругов, продолжительности, набора высоты
      const distanceDesc = distanceObject(subgroup);

      const distance =
        distanceObject(subgroup)?.distanceStr || distanceObject(subgroup)?.distanceEstimated;

      const distanceStr = distance ? `Общая дистанция: <b>${distance}</b>\n` : '';

      const route = routes.find((elm) => elm.id === eventParams.eventSubgroups[0].routeId);
      const leadInDistance = distance
        ? `Дистанция до старта круга: <b>${Math.round(route.leadInDistance * 100)}м</b>\n`
        : '';
      const leadInElevation = distance
        ? `Набор высоты до старта круга: <b>${Math.round(route.leadInElevation)}м</b>\n`
        : '';

      const lapsStr = distanceDesc?.lapsStr
        ? `Круги: <b>${distanceObject(subgroup)?.lapsStr}</b>\n`
        : '';

      const durationStr = distanceDesc?.durationStr
        ? `Длительность: <b>${distanceObject(subgroup)?.durationStr}</b>\n`
        : '';

      const elevationStr = distanceDesc?.elevationStr
        ? `Общий набор высоты: <b>${distanceObject(subgroup)?.elevationStr}</b>\n`
        : '';

      const jersey = jerseys.find((jersey) => jersey.id === subgroup.jerseyHash);
      const jerseyStr = `Джерси: <b>${jersey ? jersey.name : 'Не выбрана'}</b>\n`;

      const startLocationStr = subgroup.startLocation
        ? `Стартовый карман: <b>${subgroup.startLocation}</b>\n`
        : '';

      strGroups += `
Группа: <b>${subgroup.subgroupLabel}</b>
Старт: <b>${getTimerLocal(subgroup.eventSubgroupStart, 'DDMMYYHms')}</b>
Карта: <b>${map(subgroup.mapId)}</b>
Маршрут: <b>${routeName(subgroup.routeId)}</b>
${startLocationStr}${lapsStr}${distanceStr}${durationStr}${elevationStr}${leadInDistance}${leadInElevation}${jerseyStr}`;
    }
  }

  return event + strGroups;
};
