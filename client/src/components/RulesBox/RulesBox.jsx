import React from 'react';

import IconPowerUp from '../icons/IconPowerUp';
import IconShowResults from '../icons/IconShowResults';
import IconCategoryEnforced from '../icons/IconCategoryEnforced';
import IconTT from '../icons/IconTT';
import IconTTLock from '../icons/IconTTLock';
import IconLateJoin from '../icons/IconLateJoin';
import IconHeartMonitor from '../icons/IconHeartMonitor';
import IconPowerMeter from '../icons/IconPowerMeter';
import IconDD from '../icons/IconDD';

import styles from './RulesBox.module.css';

function RulesBox({ event }) {
  return (
    <div className={styles.block}>
      <>
        {event.rulesSet.includes('SHOW_RACE_RESULTS') && <IconShowResults />}
        {event.rulesSet.includes('ENFORCE_NO_ZPOWER') && <IconPowerMeter />}
        {event.rulesSet.includes('ENFORCE_HRM') && <IconHeartMonitor />}
        {event.rulesSet.includes('NO_POWERUPS') && <IconPowerUp />}
        {event.rulesSet.includes('NO_DRAFTING') && <IconTT />}
        {event.rulesSet.includes('NO_TT_BIKES') && <IconTTLock />}
        {event.rulesSet.includes('ALLOWS_LATE_JOIN') && <IconLateJoin />}
        {event.rulesSet.includes('TEST_BIT_10') && <IconDD />}
        {event.categoryEnforcement && <IconCategoryEnforced />}
      </>
    </div>
  );
}

export default RulesBox;
