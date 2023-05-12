import React from 'react';

import CategoriesBox from '../CategoriesBox/CategoriesBox';
import ParamsEvent from '../ParamEvent/ParamsEvent';
import RulesBox from '../RulesBox/RulesBox';
import TimeToStart from '../TimeToStart/TimeToStart';
import { getTodayTomorrow } from '../../utils/date-convert';

import styles from './CardRacePreview.module.css';

function CardRacePreview({ event, getClick }) {
  return (
    <div className={styles.wrapper} onClick={() => getClick(event.id)}>
      <h3 className={styles.title__date}>{getTodayTomorrow(event.eventStart)}</h3>
      <div className={styles.card}>
        <div className={styles.card__top}>
          <div className={styles.description}>
            <div>
              <h2 className={styles.title}>{event.name}</h2>
              <p className={styles.title__sub}>
                <TimeToStart time={event.eventStart} />
              </p>
            </div>
            <dl className={styles.list}>
              <div className={styles.box__term}>
                <dt className={styles.term}>Формат</dt>
                <dd className={styles.term__description}>{event.typeRaceCustom}</dd>
              </div>
              <div className={styles.box__term}>
                <dt className={styles.term}>Правила</dt>
                <dd className={styles.term__description}>
                  <RulesBox event={event} squareSize={18} />
                </dd>
              </div>
              <div className={styles.box__term}>
                <dt className={styles.term}>Организатор</dt>
                <dd className={styles.term__description}>{event.organizer}</dd>
              </div>
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
