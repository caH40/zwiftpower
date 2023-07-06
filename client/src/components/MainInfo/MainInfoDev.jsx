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
              <span className={styles.date}>06.07.2023</span>изменено отображение отставаний в
              результатах заезда. Исправлен баг при отображении миллисекунд
            </li>
            <li className={styles.item}>
              <span className={styles.date}>15.06.2023</span>в профиль пользователя добавлены
              данные основных Critical Power за последние 90 дней
            </li>
            <li className={styles.item}>
              <span className={styles.date}>29.05.2023</span>изменен дизайн в описании заезда
            </li>
            <li className={styles.item}>
              <span className={styles.date}>27.05.2023</span>отметка "Лидера" и "Замыкающего" в
              заезде
            </li>
            <li className={styles.item}>
              <span className={styles.date}>24.05.2023</span>создание профиля пользователя с
              результатами заездов
            </li>
            <li className={styles.item}>
              <span className={styles.date}>14.05.2023</span>замена названий столбцов в таблицах
              на иконки
            </li>
            <li className={styles.item}>
              <span className={styles.date}>13.05.2023</span>добавлена адаптивная вёрстка для
              страниц расписаний и результатов заездов
            </li>
            <li className={styles.item}>
              <span className={styles.date}>12.05.2023</span>добавлена главная страница с
              анонсами ближайших заездов
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainInfoDev;
