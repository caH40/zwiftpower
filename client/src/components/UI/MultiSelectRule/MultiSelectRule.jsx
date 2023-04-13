import React from 'react';
import { MultiSelect } from 'react-multi-select-component';

import { rules as options } from '../../../asset/zwift/rule';

import styles from './MultiSelectRule.module.css';

function MultiSelectRule({ selected, setSelected }) {
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
