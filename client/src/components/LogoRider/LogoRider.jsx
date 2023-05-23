import React from 'react';

import styles from './LogoRider.module.css';

function LogoRider({ source, firstName, lastName }) {
  return (
    <>
      {source ? (
        <img className={styles.img} src={source} alt="Ph" />
      ) : (
        <div className={styles.empty}>{firstName.slice(0, 1) + lastName.slice(0, 1)}</div>
      )}
    </>
  );
}

export default LogoRider;
