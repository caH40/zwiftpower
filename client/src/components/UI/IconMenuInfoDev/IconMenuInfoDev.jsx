import React from 'react';

import IconEdit from '../../icons/IconEdit';

import styles from './IconMenuInfoDev.module.css';

function IconMenuInfoDev({ setIsVisible, setIsVisibleDelete, setIsVisibleEdit }) {
  const getClick = () => {
    setIsVisible((prev) => !prev);
    setIsVisibleDelete(false);
    setIsVisibleEdit(false);
  };
  return (
    <div className={styles.icons} onClick={getClick}>
      <IconEdit addCls="pointer" squareSize={20} />
    </div>
  );
}

export default IconMenuInfoDev;
