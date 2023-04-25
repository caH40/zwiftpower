import React from 'react';

import RulesBox from '../RulesBox/RulesBox';
import CategoriesBox from '../CategoriesBox/CategoriesBox';
import { map, replaceWithBr, route } from '../../utils/event';
import { getLapsString } from '../../utils/declination';
import { getLocalDate } from '../../utils/date-convert';

import styles from './DescriptionEventZwift.module.css';

function DescriptionEventZwift({ event }) {
  return (
    <>
      <h3 className={styles.h3}>{event.name}</h3>
      <h4 className={styles.h4}>{getLocalDate(event.eventStart)}</h4>
      <div className={styles.params}>
        {`${map(event.eventSubgroups[0].mapId)}, ${route(event.eventSubgroups[0].routeId)},
   ${getLapsString(event.eventSubgroups[0].laps)}`}
      </div>
      <RulesBox event={event} />
      <CategoriesBox event={event} />
      <img className={styles.poster} src={event.imageUrl} alt="poster" />
      <p
        className={styles.paragraph}
        dangerouslySetInnerHTML={{ __html: replaceWithBr(event.description) }}
      ></p>
    </>
  );
}

export default DescriptionEventZwift;
