import React from 'react';

import styles from './MainInfo.module.css';

function MainInfo() {
  return (
    <div>
      <div className={styles.block}>
        <h3 className={styles.title}>Для чего ZP.ru?</h3>
        <div className={styles.block__text}>
          Сайт создан для корректного формирования протоколов заездов, основанных на правилах,
          созданных организаторами заездов в Звифт.
        </div>
        <h3 className={styles.title}>Какие типы заездов?</h3>
        <div className={styles.block__text}>
          На данный момент поддерживаются следующие типы заездов, проводимые командой{' '}
          <strong>"KOM-on"</strong>:
          <ul className={styles.list}>
            <li className={styles.item}>
              {' '}
              <span className={styles.text}>догонялки</span>
            </li>
            <li className={styles.item}>
              {' '}
              <span className={styles.text}>для новичков</span>
            </li>
            <li className={styles.item}>
              {' '}
              <span className={styles.text}>классический</span>
            </li>
            <li className={styles.item}>
              {' '}
              <span className={styles.text}>классический без групп</span>
            </li>
            <li className={styles.item}>
              <span className={styles.text}>объём</span>
            </li>
          </ul>
        </div>
        <h3 className={styles.title}>Улучшение сайта?</h3>
        <div className={styles.block__text}>
          <p className={styles.p}>
            В ближайшее время будет создана форма обратной связи для Ваших пожеланий в улучшении
            сайта и добавления новых фитчей для zwiftpower.ru.
          </p>
          <p>
            Для более оперативной обратной связи создана группа{' '}
            <a
              className={styles.link}
              target="_blank"
              rel="noreferrer"
              href="https://t.me/zwiftpower"
            >
              https://t.me/zwiftpower
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
