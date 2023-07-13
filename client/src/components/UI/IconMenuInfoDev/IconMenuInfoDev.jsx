import React from 'react';

import IconEdit from '../../icons/IconEdit';

import styles from './IconMenuInfoDev.module.css';

function IconMenuInfoDev({ setIsVisible }) {
  return (
    <div className={styles.icons} onClick={() => setIsVisible((prev) => !prev)}>
      <IconEdit addCls="pointer" />
    </div>
  );
}

export default IconMenuInfoDev;
