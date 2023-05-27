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

import styles from './DescriptionEventZwiftNew.module.css';

function DescriptionEventZwiftNew({ event, forSchedule }) {
  const [isVisibleDetailed, setIsVisibleDetailed] = useState();
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);

  const openDetailed = () => {
    setIsVisibleDetailed((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.block__main} style={{ backgroundImage: `url(${event.imageUrl})` }}>
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
