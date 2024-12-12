import React from 'react';

import CPBox from '../CPBox/CPBox';

import styles from './CPBlock.module.css';

const empty = [
  { duration: 15, value: 0 },
  { duration: 60, value: 0 },
  { duration: 300, value: 0 },
  { duration: 1200, value: 0 },
];

function CPBlock({ criticalPowers = [], label }) {
  const criticalPowersCurrent = criticalPowers.length ? criticalPowers : empty;
  const criticalPowersFiltered = criticalPowersCurrent.filter((cp) =>
    [15, 60, 300, 1200].includes(cp.duration)
  );

  const title = label === 'watts' ? 'МОЩНОСТЬ (ватты)' : 'УДЕЛЬНАЯ МОЩНОСТЬ (вт/кг)';
  return (
    !!criticalPowersFiltered.length && (
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{title}</h3>
        {criticalPowersFiltered.map((cp) => (
          <CPBox
            value={cp.value}
            duration={cp.duration}
            date={cp.date}
            name={cp.name}
            label={label}
            key={cp.duration}
          />
        ))}
      </div>
    )
  );
}

export default CPBlock;
