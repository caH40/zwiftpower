import React from 'react';

import IconParamsWorld from '../icons/Params/IconParamsWorld';
import IconParamsRoute from '../icons/Params/IconParamsRoute';
import IconParamsDistance from '../icons/Params/IconParamsDistance';
import IconParamsAscent from '../icons/Params/IconParamsAscent';
import IconParamsDuration from '../icons/Params/IconParamsDuration';

import styles from './ParamsEvent.module.css';

function ParamsEvent() {
  return (
    <div className={styles.block}>
      <div className={styles.box}>
        <IconParamsWorld squareSize={30} />
        <div className={styles.description}>
          <h4 className={styles.title}>Marakuri Island</h4>
          <p className={styles.title__sub}>КАРТА</p>
        </div>
      </div>
      <div className={styles.box}>
        <IconParamsRoute squareSize={30} />
        <div className={styles.description}>
          <h4 className={styles.title}>London Classique Reverse</h4>
          <p className={styles.title__sub}>МАРШРУТ</p>
        </div>
      </div>
      <div className={styles.box}>
        <IconParamsDistance squareSize={30} />
        <div className={styles.description}>
          <h4 className={styles.title}>23.5 км</h4>
          <p className={styles.title__sub}>РАССТОЯНИЕ</p>
        </div>
      </div>
      <div className={styles.box}>
        <IconParamsAscent squareSize={30} />
        <div className={styles.description}>
          <h4 className={styles.title}>855 метров</h4>
          <p className={styles.title__sub}>НАБОР ВЫСОТЫ</p>
        </div>
      </div>
      <div className={styles.box}>
        <IconParamsDuration squareSize={30} />
        <div className={styles.description}>
          <h4 className={styles.title}>60 минут</h4>
          <p className={styles.title__sub}>ПРОДОЛЖИТЕЛЬНОСТЬ</p>
        </div>
      </div>
    </div>
  );
}

export default ParamsEvent;
