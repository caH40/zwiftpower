import { useMemo } from 'react';
import cn from 'classnames/bind';

import {
  optionPrivate,
  optionsCulling,
  optionsEventType,
} from '../../assets/select/event-edit';
import { jerseys } from '../../assets/zwift/raw/jerseys';
import { rules } from '../../assets/zwift/rule';
import { tags } from '../../assets/zwift/tags';
import { getTimerLocal } from '../../utils/date-local';
import { distanceObject, getMapName } from '../../utils/event';
import { useRaceRoute } from '../../hook/useRaceRoute';

import styles from './SubgroupsDescription.module.css';

const cx = cn.bind(styles);

/**
 * Компонент для отображения подробного описания настроек эвента и каждой группы.
 * @param {object} eventParams - Параметры эвента.
 * @returns {JSX.Element} - JSX элемент с описанием настроек.
 */
export default function SubgroupsDescription({ eventParams }) {
  // Список routeIds из подгрупп.
  const routeIds = useMemo(() => {
    return [...new Set(eventParams.eventSubgroups.map(({ routeId }) => routeId))];
  }, [eventParams]);

  const routes = useRaceRoute(routeIds);

  // Создание строки правил на основании Tags.
  const createTagsSet = (tagsFromEvent) => {
    if (!tagsFromEvent || !Array.isArray(tagsFromEvent)) {
      return null;
    }

    const filteredTags = tags.filter((tag) =>
      tag.value.every((value) => tagsFromEvent.includes(value))
    );

    return (
      <>
        {filteredTags.map((tag, index) => (
          <div key={index}>
            - <b>{tag.label}</b>
          </div>
        ))}
      </>
    );
  };

  // Основная информация о событии
  const eventType = optionsEventType.find(
    (elm) => elm.name === eventParams.eventType
  )?.translate;
  const privacy = optionPrivate.find(
    (elm) => elm.name === eventParams.microserviceEventVisibility
  )?.translate;
  const visibility = optionsCulling.find(
    (elm) => elm.name === eventParams.cullingType
  )?.translate;

  return (
    <div className={styles.eventDescription}>
      {/* Общая информация о событии */}
      <section className={styles.eventGeneral}>
        <div>
          <b>Клуб:</b> {eventParams.clubName}
        </div>
        <div>
          <b>Тип заезда:</b> {eventType}
        </div>
        <div>
          <b>Приватность заезда:</b> {privacy}
        </div>
        <div>
          <b>Строгая категоризация:</b>{' '}
          {eventParams.categoryEnforcement ? 'Включена' : 'Выключена'}
        </div>
        <div>
          <b>Видимость райдеров:</b> {visibility}
        </div>

        <div>
          <b>Правила:</b>
        </div>
        {eventParams.rulesSet?.map((rule, index) => {
          const ruleInfo = rules.find((elm) => elm.value === rule);
          return (
            <div key={index}>
              - <b>{ruleInfo?.translate || rule}</b>
            </div>
          );
        })}

        {eventParams.eventSubgroups?.[0]?.tags && (
          <>{createTagsSet(eventParams.eventSubgroups[0].tags)}</>
        )}
      </section>

      {/* Информация по группам */}
      {eventParams.eventSubgroups?.map((subgroup, groupIndex) => {
        const isWomenOnly = subgroup.rulesSet?.includes('LADIES_ONLY');
        const distanceDesc = distanceObject(subgroup);
        const distance = distanceDesc?.distanceStr || distanceDesc?.distanceEstimated;
        const route = routes[subgroup.routeId];
        const jersey = jerseys.find((jersey) => jersey.id === subgroup.jerseyHash);
        const imageUrl = routes[subgroup.routeId]?.imageUrl;

        return (
          <section key={groupIndex} className={cx('eventGroup', subgroup.subgroupLabel)}>
            <div className={styles.text}>
              <div>
                <b>Группа:</b> {subgroup.subgroupLabel}
                {isWomenOnly ? ' (только для женщин)' : ''}
              </div>
              <div>
                <b>Старт:</b> {getTimerLocal(subgroup.eventSubgroupStart, 'DDMMYYHms')}
              </div>
              <div>
                <b>Карта:</b> {getMapName(subgroup.mapId)}
              </div>
              <div>
                <b>Маршрут:</b> {routes[subgroup.routeId]?.name}
              </div>

              {subgroup.startLocation && (
                <div>
                  <b>Стартовый карман:</b> {subgroup.startLocation}
                </div>
              )}

              {distanceDesc?.lapsStr && (
                <div>
                  <b>Круги:</b> {distanceDesc.lapsStr}
                </div>
              )}

              {distance && (
                <div>
                  <b>Общая дистанция:</b> {distance}
                </div>
              )}

              {distanceDesc?.durationStr && (
                <div>
                  <b>Длительность:</b> {distanceDesc.durationStr}
                </div>
              )}

              {distanceDesc?.elevationStr && (
                <div>
                  <b>Общий набор высоты:</b> {distanceDesc.elevationStr}
                </div>
              )}

              {distance && route && (
                <>
                  <div>
                    <b>Дистанция до старта круга:</b>{' '}
                    {Math.round(route.leadInDistance * 10) / 10}
                    км
                  </div>
                  <div>
                    <b>Набор высоты до старта круга:</b> {Math.round(route.leadInElevation)}м
                  </div>
                </>
              )}

              <div>
                <b>Джерси:</b> {jersey ? jersey.name : 'Не выбрана'}
              </div>

              {subgroup.name && (
                <div>
                  <b>Заголовок:</b> {subgroup.name}
                </div>
              )}

              {subgroup.description && (
                <div>
                  <b>Описание:</b> {subgroup.description}
                </div>
              )}
            </div>

            {imageUrl && (
              <img src={imageUrl} className={styles.img} alt="Карта маршрута" width={260} />
            )}
          </section>
        );
      })}
    </div>
  );
}
