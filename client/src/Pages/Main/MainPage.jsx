import React from 'react';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import CardRacePreview from '../../components/CardRacePreview/CardRacePreview';

import styles from './MainPage.module.css';

function MainPage() {
  useTitle('Анонсы заездов, новости');
  useBackground(false);

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__preview}>
        <CardRacePreview />
      </div>
      <div className={styles.wrapper__info}>y</div>
    </section>
  );
}

export default MainPage;
