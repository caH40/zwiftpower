import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Background.module.css';

function Background() {
  const { isActive, opacity, picture } = useSelector((state) => state.background.value);

  return (
    <>
      {isActive ? (
        <img
          className={styles.background}
          style={{ opacity }}
          src={`/images/background/${picture}.jpg`}
          alt="background"
        />
      ) : undefined}
    </>
  );
}

export default Background;
