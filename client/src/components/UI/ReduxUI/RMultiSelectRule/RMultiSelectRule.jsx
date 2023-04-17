import React from 'react';
import { useDispatch } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';

import { rules as options } from '../../../../asset/zwift/rule';
import { setSelectedRules } from '../../../../redux/features/eventParamsSlice';

import styles from './RMultiSelectRule.module.css';

function RMultiSelectRule({ selected }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.box}>
      <MultiSelect
        options={options}
        value={selected}
        onChange={(e) => dispatch(setSelectedRules(e))}
        labelledBy="Select"
      />
    </div>
  );
}

export default RMultiSelectRule;
