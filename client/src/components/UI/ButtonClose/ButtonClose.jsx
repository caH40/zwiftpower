import React from 'react';

import styles from './ButtonClose.module.css';

function ButtonClose({ getClick, scale }) {
  return (
    <button
      onClick={getClick}
      className={styles.myBtn}
      style={scale && { transform: `scale(${scale})` }}
      type="button"
    />
  );
}

export default ButtonClose;
