import React from 'react';

import { getTimerLocal } from '../../../utils/date-local';

import styles from './SelectForChart.module.css';

function SelectForChart({ state, setState, optionsRaw }) {
  const options = optionsRaw.map((event) => ({
    cpBestEfforts: event.cpBestEfforts,
    _id: event._id,
    name: `${getTimerLocal(event.eventStart, 'DDMMYY')}, ${event.eventName}`,
  }));

  return (
    <select
      className={styles.select}
      onChange={(e) => setState(optionsRaw.find((event) => event._id === e.target.value))}
      value={state?.id || ''}
    >
      <option value="" label={'Выбор заезда'} />
      {options.map((option) => (
        <option
          className={styles.option}
          value={option._id}
          label={option.name}
          key={option._id}
        />
      ))}
    </select>
  );
}

export default SelectForChart;
