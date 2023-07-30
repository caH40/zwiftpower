import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { gapStart, replaceWithBr } from '../../utils/event';
import { getTimerLocal } from '../../utils/date-local';
import IconEdit from '../icons/IconEdit';

import ParamsEvent from '../ParamsEvent/ParamsEvent';
import CategoryBoxDescription from '../CategoryBoxDescription/CategoryBoxDescription';
import RaceBoxDescription from '../RaceBoxDescription/RaceBoxDescription';
import OpenBoxArrow from '../UI/OpenBoxArrow/OpenBoxArrow';
import PrivateEvent from '../PrivateEvent/PrivateEvent';
import LinksRoute from '../LinksRoute/LinksRoute';

import styles from './DescriptionEventZwiftNew.module.css';

function DescriptionEventZwiftNew({ event, forSchedule }) {
  const [isOpened, setIsOpened] = useState(false);
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);

  const openDetailed = () => {
    setIsOpened((prev) => !prev);
  };

  const gaps = gapStart(event);

  return (
    <div className={styles.wrapper}>
      <div
        className={cn(styles.block__main, { [styles.block__mainClosed]: !isOpened })}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <OpenBoxArrow getClick={openDetailed} isOpened={isOpened} />
        <div
          className={cn(styles.main__inner, {
            [styles.main__innerClosed]: !isOpened,
          })}
        >
          <div className={styles.box__left}>
            <div className={styles.box__title}>
              <h2 className={styles.title}>{event.name}</h2>
              {isModerator && forSchedule && (
                <Link to={`/zwift/edit/event/${event.id}`}>
                  <IconEdit tooltip={'Редактирование параметров заезда в Звифте'} />
                </Link>
              )}
            </div>
            <PrivateEvent event={event} />
            <h3 className={styles.subtitle}>
              {getTimerLocal(event.eventStart, 'DDMMYYHm', true)}
            </h3>
          </div>

          {isOpened && (
            <div className={styles.box__right}>
              <RaceBoxDescription event={event} />
              {event?.eventSubgroups?.map((subgroup) => (
                <CategoryBoxDescription key={subgroup.id} subgroup={subgroup} gaps={gaps} />
              ))}
            </div>
          )}
        </div>

        {isOpened && (
          <div className={styles.box__params}>
            <ParamsEvent event={event} />
          </div>
        )}
      </div>

      {isOpened && (
        <div className={styles.block__text}>
          <LinksRoute routeId={event?.eventSubgroups[0].routeId} />
          <p
            className={styles.paragraph}
            dangerouslySetInnerHTML={{ __html: replaceWithBr(event.description) }}
          ></p>
        </div>
      )}
    </div>
  );
}

export default DescriptionEventZwiftNew;
