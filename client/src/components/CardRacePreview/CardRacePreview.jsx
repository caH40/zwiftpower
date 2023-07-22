import React from 'react';

import CategoriesBox from '../CategoriesBox/CategoriesBox';
import ParamsEvent from '../ParamsEvent/ParamsEvent';
import RulesBox from '../RulesBox/RulesBox';
import TimeToStart from '../TimeToStart/TimeToStart';
import { getTodayTomorrow } from '../../utils/date-local';
import TdRaceType from '../Tables/Td/TdRaceType';
import PrivateEvent from '../PrivateEvent/PrivateEvent';
import { useResize } from '../../hook/use-resize';

import styles from './CardRacePreview.module.css';

function CardRacePreview({ event, getClick }) {
  const { isScreenSm: sm } = useResize();
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
                <dt className={styles.term}>Формат</dt>
                <dd className={styles.term__description}>
                  <TdRaceType typeRaceCustom={event.typeRaceCustom} nameFull={true} />
                </dd>
              </div>
              {sm && (
                <>
                  <div className={styles.box__term}>
                    <dt className={styles.term}>Правила</dt>
                    <dd className={styles.term__description}>
                      <RulesBox event={event} squareSize={18} />
                    </dd>
                  </div>
                  <div className={styles.box__term}>
                    <dt className={styles.term}>Тип</dt>
                    <dd className={styles.term__description}>{event.eventType}</dd>
                  </div>
                  <div className={styles.box__term}>
                    <dt className={styles.term}>Организатор</dt>
                    <dd className={styles.term__description}>{event.organizer}</dd>
                  </div>
                </>
              )}
            </dl>
          </div>
          <img className={styles.poster} src={event.imageUrl} alt="poster" />
        </div>
        <div className={styles.card__bottom}>
          <ParamsEvent event={event} />
          <div className={styles.box__categories}>
            <CategoriesBox event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRacePreview;
