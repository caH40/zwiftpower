import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RulesBox from '../RulesBox/RulesBox';
import CategoriesBox from '../CategoriesBox/CategoriesBox';
import { replaceWithBr } from '../../utils/event';
import { getLocalDate } from '../../utils/date-convert';
import IconEdit from '../icons/IconEdit';
import ButtonSimple from '../UI/Filters/ButtonSimple/ButtonSimple';
import IconOpenClose from '../icons/IconOpenClose';
import ParamsEvent from '../ParamsEvent/ParamsEvent';

import styles from './DescriptionEventZwift.module.css';

function DescriptionEventZwift({ event, forSchedule }) {
  const [isVisibleDetailed, setIsVisibleDetailed] = useState();
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);

  const openDetailed = () => {
    setIsVisibleDetailed((prev) => !prev);
  };

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
      <ParamsEvent event={event} addCls={'mb10'} />
      <RulesBox event={event} addCls={'mb10'} />
      <CategoriesBox event={event} needGaps={true} addCls={'mb10'} />
      <ButtonSimple getClick={openDetailed} addCls={'mb10'}>
        <span>Подробное описание</span>
        <IconOpenClose isOpened={isVisibleDetailed} />
      </ButtonSimple>
      {isVisibleDetailed && (
        <div className={styles.box__detailed}>
          <img className={styles.poster} src={event.imageUrl} alt="poster" />
          <p
            className={styles.paragraph}
            dangerouslySetInnerHTML={{ __html: replaceWithBr(event.description) }}
          ></p>
        </div>
      )}
    </>
  );
}

export default DescriptionEventZwift;
