import React from 'react';

import CategoriesBox from '../CategoriesBox/CategoriesBox';
import ParamsEvent from '../ParamsEvent/ParamsEvent';
import RulesBox from '../RulesBox/RulesBox';
import TimeToStart from '../TimeToStart/TimeToStart';
import { getTodayTomorrow } from '../../utils/date-local';
import TdRaceType from '../Tables/Td/TdRaceType';
import PrivateEvent from '../PrivateEvent/PrivateEvent';
import { useResize } from '../../hook/use-resize';
import { getEventType } from '../../utils/event';

import styles from './CardRacePreview.module.css';

/**
 * Карточка Эвента.
 */
function CardRacePreview({ event, getClick }) {
  const { isScreenSm: sm } = useResize();

  const logoSrc = event?.logoFileInfo?.original;

  // Для отображения параметров заезда берутся данные из первой группы в массиве групп Эвента.
  // Поэтому если в других группах будет другой маршрут, то это можно увидеть в открывающемся блоке описания Эвента.
  // eslint-disable-next-line prefer-destructuring
  const { mapId, routeId, durationInSeconds, distanceInMeters, laps, distanceSummary } =
    event.eventSubgroups[0] || [];

  return (
    <div className={styles.wrapper} onClick={() => getClick(event.id)}>
      <h3 className={styles.title__date}>{getTodayTomorrow(event.eventStart)}</h3>
      <div className={styles.card}>
        <div className={styles.card__top}>
          <div className={styles.description}>
            <div>
              <h2 className={styles.title}>
                {event.name}
                <PrivateEvent event={event} />
              </h2>
              <p className={styles.title__sub}>
                <TimeToStart time={event.eventStart} />
              </p>
            </div>

            <dl className={styles.list}>
              <div className={styles.box__term}>
                <dt className={styles.term}>Правила</dt>
                <dd className={styles.term__description}>
                  <RulesBox event={event} squareSize={18} />
                </dd>
              </div>
              {sm && (
                <>
                  <div className={styles.box__term}>
                    <dt className={styles.term}>Формат</dt>
                    <dd className={styles.term__description}>
                      <TdRaceType typeRaceCustom={event.typeRaceCustom} nameFull={true} />
                    </dd>
                  </div>

                  {!logoSrc && (
                    <div className={styles.box__term}>
                      <dt className={styles.term}>Организатор</dt>
                      <dd className={styles.term__description}>{event.organizer}</dd>
                    </div>
                  )}
                </>
              )}
            </dl>
          </div>
          <div className={styles.box__img}>
            <img className={styles.poster} src={event.imageUrl} alt="poster" />
            <span className={styles.title__img}>{getEventType(event.eventType)}</span>

            {/* Логотип организатора */}
            {!!logoSrc && (
              <img
                className={styles.logo__img}
                src={logoSrc}
                alt="Лого Организатора"
                width={35}
                height={35}
              />
            )}
          </div>
        </div>

        {/* Подвал карточки */}
        <div className={styles.card__bottom}>
          <ParamsEvent
            mapId={mapId}
            routeId={routeId}
            durationInSeconds={durationInSeconds}
            distanceInMeters={distanceInMeters}
            laps={laps}
            distanceSummary={distanceSummary}
          />

          {/* Отображение категорий */}
          <div className={styles.box__categories}>
            <CategoriesBox event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRacePreview;
