import React from 'react';

import styles from './ButtonClose.module.css';

function ButtonClose({ getClick }) {
  return <button onClick={getClick} className={styles.myBtn} type="button" />;
}

export default ButtonClose;
