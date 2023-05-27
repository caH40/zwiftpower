import React from 'react';

import styles from './Sweeper.module.css';

function Sweeper({ getSweepers, profileId }) {
  const isSweeper = getSweepers().includes(profileId);

  return <>{isSweeper && <span className={styles.box}>Sweeper</span>}</>;
}

export default Sweeper;
