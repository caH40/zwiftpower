import React from 'react';

import styles from './Leader.module.css';

function Leader({ getLeaders, profileId }) {
  const isLeader = getLeaders().includes(profileId);

  return <>{isLeader && <span className={styles.box}>Leader</span>}</>;
}

export default Leader;
