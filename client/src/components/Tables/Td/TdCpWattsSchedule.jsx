import React from 'react';

import styles from './Td.module.css';

function TdCpWattsSchedule({ cp = [], dimension, duration }) {
  const value = cp.find((cp) => cp.duration === duration)?.value;

  return (
    <td>
      {value ? (
        <>
          <span>{value}</span>
          <span className={styles.small}>{dimension}</span>
        </>
      ) : (
        <span>н/д</span>
      )}
    </td>
  );
}

export default TdCpWattsSchedule;
