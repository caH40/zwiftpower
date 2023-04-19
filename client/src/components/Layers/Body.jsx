import React from 'react';

import Background from '../Background/Background';

import styles from './Body.module.css';

function Body({ children }) {
  return (
    <section className={styles.body}>
      <Background />
      <div className={styles.container}>{children}</div>
    </section>
  );
}

export default Body;
