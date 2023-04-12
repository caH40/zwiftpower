import React from 'react';
import { MultiSelect } from 'react-multi-select-component';

import styles from './MultiSelectRule.module.css';

function MultiSelectRule({ selected, setSelected }) {
  const options = [
    { value: 'SHOW_RACE_RESULTS', label: 'SHOW_RACE_RESULTS' },
    { value: 'ENFORCE_NO_ZPOWER', label: 'ENFORCE_NO_ZPOWER' },
    { value: 'ENFORCE_HRM', label: 'ENFORCE_HRM' },
    { value: 'NO_POWERUPS', label: 'NO_POWERUPS' },
    { value: 'NO_TT_BIKES', label: 'NO_TT_BIKES' },
  ];
  return (
    <div className={styles.box}>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
}

export default MultiSelectRule;
