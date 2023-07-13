import React, { useState } from 'react';

import IconMenuInfoDev from '../UI/IconMenuInfoDev/IconMenuInfoDev';
import PopupMenuInfoDev from '../UI/PopupMenuInfoDev/PopupMenuInfoDev';

import styles from './MainInfo.module.css';

function MainInfoDev({ isModerator }) {
  const [isVisible, setIsVisible] = useState(false);
  const devInfo = [
    {
      releaseDate: '06.07.2023',
      text: 'изменено отображение отставаний в  результатах заезда. Исправлен баг при отображении миллисекунд',
      _id: 0,
    },
  ];
  return (
    <div>
      <div className={styles.block}>
        {isModerator && <IconMenuInfoDev setIsVisible={setIsVisible} />}
        <PopupMenuInfoDev isVisible={isVisible} setIsVisible={setIsVisible} />
        <h3 className={styles.title}>Изменения на сайте</h3>
        <div className={styles.text}>
          <ul className={styles.list__dev}>
            {devInfo.map((info) => (
              <li className={styles.item} key={info._id}>
                <span className={styles.date}>{info.releaseDate}</span>
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
