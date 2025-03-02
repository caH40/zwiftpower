// import TypeRaceBox from '../TypeRaceBox/TypeRaceBox';
import RulesBox from '../RulesBox/RulesBox';
import { getEventType } from '../../utils/event';

import styles from './RaceBoxDescription.module.css';

function RaceBoxDescription({ event }) {
  return (
    <div className={styles.wrapper}>
      {/* <h3 className={styles.title}>Параметры заезда</h3> */}

      <dl className={styles.list}>
        {/* <div className={styles.box__term}>
          <dt className={styles.term}>ФОРМАТ:</dt>
          <dd className={styles.description}>
            <TypeRaceBox event={event} />
          </dd>
        </div> */}
        <div className={styles.box__term}>
          <dt className={styles.term}>ПРАВИЛА:</dt>
          <dd className={styles.description}>
            <RulesBox event={event} />
          </dd>
        </div>
        <div className={styles.box__term}>
          <dt className={styles.term}>Тип</dt>
          <dd className={styles.description}>{getEventType(event.eventType)}</dd>
        </div>
        <div className={styles.box__term}>
          <dt className={styles.term}>ОРГАНИЗАТОР:</dt>
          <dd className={styles.description}>{event.organizer}</dd>
        </div>
      </dl>
    </div>
  );
}

export default RaceBoxDescription;
