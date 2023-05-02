import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import RulesBox from '../RulesBox/RulesBox';
import CategoriesBox from '../CategoriesBox/CategoriesBox';
import { distanceSummary, map, replaceWithBr, route } from '../../utils/event';
import { getLocalDate } from '../../utils/date-convert';
import IconEdit from '../icons/IconEdit';

import styles from './DescriptionEventZwift.module.css';

function DescriptionEventZwift({ event, forSchedule }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);
  const [subgroup] = event.eventSubgroups;
  return (
    <>
      <div className={styles.title__box}>
        <h3 className={styles.title}>{event.name}</h3>
        {isModerator && forSchedule && (
          <Link to={`/zwift/edit/event/${event.id}`}>
            <IconEdit toolTip={'Редактирование параметров заезда в Звифте'} />
          </Link>
        )}
      </div>
      <h4 className={styles.h4}>{getLocalDate(event.eventStart)}</h4>
      <div className={styles.params}>
        <span className={styles.comma}>{map(event.eventSubgroups[0].mapId)}</span>

        {event.eventSubgroups[0].zwiftInsiderUrl ? (
          <Link
            className={cn(styles.link, styles.comma)}
            target="_blank"
            rel="noreferrer"
            to={event.eventSubgroups[0].zwiftInsiderUrl}
          >
            {route(event.eventSubgroups[0].routeId)}
          </Link>
        ) : (
          <span className={styles.comma}>{route(event.eventSubgroups[0].routeId)}</span>
        )}

        <span> {distanceSummary(subgroup)}</span>
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
