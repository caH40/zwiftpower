import React from 'react';

import styles from './MainInfo.module.css';

function MainInfo() {
  return (
    <div>
      <div className={styles.block}>
        <h3 className={styles.title}>Для чего ZP.ru?</h3>
        <div className={styles.text}>
          Сайт создан для корректного формирования протоколов заездов, основанных на правилах,
          созданных организаторами заездов в Звифт.
        </div>
        <h3 className={styles.title}>Какие типы заездов?</h3>
        <div className={styles.text}>
          На данный момент поддерживаются следующие типы заездов, проводимые командой{' '}
          <strong>"KOM-on"</strong>:
          <ul className={styles.list}>
            <li className={styles.item}>догонялки</li>
            <li className={styles.item}>для новичков</li>
            <li className={styles.item}>классический</li>
            <li className={styles.item}>классический без групп</li>
            <li className={styles.item}>объём</li>
          </ul>
        </div>
        <h3 className={styles.title}>Улучшение сайта?</h3>
        <div className={styles.text}>
          В ближайшее время будет создана форма обратной связи для Ваших пожеланий в улучшении
          сайта и добавления новых фитчей для zwiftpower.ru
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
