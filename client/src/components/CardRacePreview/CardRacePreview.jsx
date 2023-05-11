import React from 'react';

import IconPowerUp from '../icons/IconPowerUp';
import IconCategoryEnforced from '../icons/IconCategoryEnforced';
import IconShowResults from '../icons/IconShowResults';
import CategoriesBox from '../CategoriesBox/CategoriesBox';
import ParamsEvent from '../ParamEvent/ParamsEvent';

import styles from './CardRacePreview.module.css';

function CardRacePreview() {
  const eventSubgroups = [
    { subgroupLabel: 'A', totalEntrantCount: 10 },
    { subgroupLabel: 'B', totalEntrantCount: 99 },
    { subgroupLabel: 'C', totalEntrantCount: 10 },
    { subgroupLabel: 'D', totalEntrantCount: 10 },
    { subgroupLabel: 'E', totalEntrantCount: 10 },
  ];
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title__date}>Сегодня</h3>
      <div className={styles.card}>
        <div className={styles.card__top}>
          <div className={styles.description}>
            <div>
              <h2 className={styles.title}>KOM-On catch up race</h2>
              <p className={styles.title__sub}>19:30 (Москва), старт через 3ч30м</p>
            </div>
            <dl className={styles.list}>
              <div className={styles.box__term}>
                <dt className={styles.term}>Формат</dt>
                <dd className={styles.term__description}>догонялки</dd>
              </div>
              <div className={styles.box__term}>
                <dt className={styles.term}>Правила</dt>
                <dd className={styles.term__description}>
                  <div className={styles.box__rules}>
                    <IconPowerUp squareSize={18} />
                    <IconCategoryEnforced squareSize={18} />
                    <IconShowResults squareSize={18} />
                  </div>
                </dd>
              </div>
              <div className={styles.box__term}>
                <dt className={styles.term}>Организатор</dt>
                <dd className={styles.term__description}>KOM-on</dd>
              </div>
            </dl>
          </div>
          <img
            className={styles.poster}
            src="/images/posters/komon/london-1.jpg"
            alt="poster"
          />
        </div>
        <div className={styles.card__bottom}>
          <ParamsEvent />
          <CategoriesBox event={{ eventSubgroups }} />
        </div>
      </div>
    </div>
  );
}

export default CardRacePreview;
