import React from 'react';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './RaceRuleBox.module.css';

const RaceRuleBox = ({ label, name }) => {
  return (
    <MyTooltip tooltip={name}>
      <div className={styles.box}>{label}</div>
    </MyTooltip>
  );
};

export default RaceRuleBox;
