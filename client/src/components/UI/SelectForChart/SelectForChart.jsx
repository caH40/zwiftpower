import React from 'react';

import { getTimerLocal } from '../../../utils/date-local';

import styles from './SelectForChart.module.css';

function SelectForChart({ state, setState, optionsRaw, name }) {
  const options = optionsRaw.map((event) => ({
    cpBestEfforts: event.cpBestEfforts,
    id: event.id,
    name: `${getTimerLocal(event.eventStart, 'YMD')}, ${event.eventName}`,
  }));
  return (
    <select
      className={styles.select}
      onChange={(e) => setState(optionsRaw.find((event) => event.id === e.target.value))}
      value={state?.id || ''}
    >
      <option value="" label={'Выбор заезда для сравнения'} />
      {options.map((option) => (
        <option
          className={styles.option}
          value={option.id}
          label={option.name}
          key={option.id}
        />
      ))}
    </select>
  );
}

export default SelectForChart;
