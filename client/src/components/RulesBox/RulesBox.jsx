import React from 'react';

import { rules as rulesEvent } from '../../asset/zwift/rule';

import styles from './RulesBox.module.css';

function RulesBox({ event }) {
  const categoryEnforcement = event.categoryEnforcement && 'Строгая категоризация';

  return (
    <div className={styles.block}>
      {event.rulesSet.map((rule) => (
        <p className={styles.text} key={rule}>
          {rulesEvent.find((ruleEvent) => ruleEvent.value === rule)?.label}
        </p>
      ))}
      <p className={styles.text}>{categoryEnforcement}</p>
    </div>
  );
}

export default RulesBox;
