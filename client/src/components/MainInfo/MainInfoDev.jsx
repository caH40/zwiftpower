import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import IconMenuInfoDev from '../UI/IconMenuInfoDev/IconMenuInfoDev';
import PopupMenuInfoDev from '../UI/PopupMenuInfoDev/PopupMenuInfoDev';
import { getLocalDate } from '../../utils/date-convert';

import styles from './MainInfo.module.css';

function MainInfoDev({ isModerator }) {
  const [isVisible, setIsVisible] = useState(false);
  const informationDev = useSelector((state) => state.popupForm.informationDev);

  return (
    <div>
      <div className={styles.block}>
        {isModerator && <IconMenuInfoDev setIsVisible={setIsVisible} />}
        <PopupMenuInfoDev isVisible={isVisible} setIsVisible={setIsVisible} />
        <h3 className={styles.title}>Изменения на сайте</h3>
        <div className={styles.text}>
          <ul className={styles.list__dev}>
            {informationDev.map((info) => (
              <li className={styles.item} key={info._id}>
                <span className={styles.date}>
                  {getLocalDate(info.releaseDate, 'onlyDate')}
                </span>
                <span>{info.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainInfoDev;
