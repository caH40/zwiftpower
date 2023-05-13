import React from 'react';

import styles from './MainInfo.module.css';

function MainInfoDev() {
  return (
    <div>
      <div className={styles.block}>
        <h3 className={styles.title}>Изменения на сайте</h3>
        <div className={styles.text}>
          <ul className={styles.list__dev}>
            <li className={styles.item}>
              <span className={styles.date}>12.05.2023</span>добавлена главная страница с
              анонсами ближайших заездов
            </li>
            <li className={styles.item}>
              <span className={styles.date}>13.05.2023</span>добавлена адаптивная вёрстка для
              страниц расписаний и результатов заездов
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainInfoDev;
