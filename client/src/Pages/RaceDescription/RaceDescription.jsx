import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import TableSingedRiders from '../../components/Tables/TableSingedRiders/TableSingedRiders';
import CategoriesBox from '../../components/CategoriesBox/CategoriesBox';
import RulesBox from '../../components/RulesBox/RulesBox';
import { getEvent } from '../../api/zwift/events';
import { getLocalDate } from '../../utils/date-convert';
import { map, replaceWithBr, route } from '../../utils/event';
import { getLapsString } from '../../utils/declination';

import styles from './RaceDescription.module.css';

function RaceDescription() {
  const [event, setEvent] = useState({});
  const [isVisibleDesc, setIsVisibleDesc] = useState(false);
  useTitle('Описание заезда');
  const { eventId } = useParams();
  console.log(event);
  useEffect(() => {
    getEvent(eventId).then((response) => {
      setEvent(response.data.event);
    });
  }, [eventId]);

  return (
    <section>
      {event?.id ? (
        <>
          <h3 className={styles.h3}>{event.name}</h3>
          <h4 className={styles.h4}>{getLocalDate(event.eventStart)}</h4>
          <div className={styles.params}>
            {`${map(event.eventSubgroups[0].mapId)}, ${route(event.eventSubgroups[0].routeId)},
           ${getLapsString(event.eventSubgroups[0].laps)}`}
          </div>
          <RulesBox event={event} />
          <CategoriesBox event={event} />
          <div className={styles.description} onClick={() => setIsVisibleDesc((prev) => !prev)}>
            <h4 className={styles.description__title}>Описание</h4>
          </div>
          {isVisibleDesc && (
            <>
              <img className={styles.poster} src={event.imageUrl} alt="poster" />
              <p
                className={styles.paragraph}
                dangerouslySetInnerHTML={{ __html: replaceWithBr(event.description) }}
              ></p>
            </>
          )}
          <TableSingedRiders riders={event.singedRiders} />
        </>
      ) : (
        'Заезд не найден!'
      )}
    </section>
  );
}

export default RaceDescription;
