import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { gapStart, replaceWithBr } from '../../utils/event';
import { getLocalDate } from '../../utils/date-convert';
import IconEdit from '../icons/IconEdit';
import ButtonSimple from '../UI/Filters/ButtonSimple/ButtonSimple';
import IconOpenClose from '../icons/IconOpenClose';
import ParamsEvent from '../ParamsEvent/ParamsEvent';
import CategoryBoxDescription from '../CategoryBoxDescription/CategoryBoxDescription';
import RaceBoxDescription from '../RaceBoxDescription/RaceBoxDescription';

import styles from './DescriptionEventZwiftNew.module.css';

function DescriptionEventZwiftNew({ event, forSchedule }) {
  const [isVisibleDetailed, setIsVisibleDetailed] = useState();
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);

  const openDetailed = () => {
    setIsVisibleDetailed((prev) => !prev);
  };
  const gaps = gapStart(event);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block__main} style={{ backgroundImage: `url(${event.imageUrl})` }}>
        <div className={styles.main__inner}>
          <div className={styles.box__left}>
            <div className={styles.box__title}>
              <h2 className={styles.title}>{event.name}</h2>
              {isModerator && forSchedule && (
                <Link to={`/zwift/edit/event/${event.id}`}>
                  <IconEdit
                    tooltip={'Редактирование параметров заезда в Звифте'}
                    bgColor={'white'}
                  />
                </Link>
              )}
            </div>
            <h3 className={styles.subtitle}>{getLocalDate(event.eventStart)}</h3>
          </div>

          <div className={styles.box__right}>
            <RaceBoxDescription event={event} />
            {event?.eventSubgroups?.map((subgroup) => (
              <CategoryBoxDescription key={subgroup.id} subgroup={subgroup} gaps={gaps} />
            ))}
          </div>
        </div>

        <div className={styles.box__params}>
          <ParamsEvent event={event} bgColor={'white'} />
        </div>
      </div>
      <div className={styles.block__text}>
        <p
          className={styles.paragraph}
          dangerouslySetInnerHTML={{ __html: replaceWithBr(event.description) }}
        ></p>
      </div>
    </div>
  );
}

export default DescriptionEventZwiftNew;
