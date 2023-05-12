import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
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

function RulesBox({ event, squareSize = 24, addCls }) {
  return (
    <div className={cn(styles.block, cns(styles, addCls))}>
      <>
        {event.rulesSet.includes('SHOW_RACE_RESULTS') && (
          <IconShowResults squareSize={squareSize} />
        )}
        {event.rulesSet.includes('ENFORCE_NO_ZPOWER') && (
          <IconPowerMeter squareSize={squareSize} />
        )}
        {event.rulesSet.includes('ENFORCE_HRM') && <IconHeartMonitor squareSize={squareSize} />}
        {event.rulesSet.includes('NO_POWERUPS') && <IconPowerUp squareSize={squareSize} />}
        {event.rulesSet.includes('NO_DRAFTING') && <IconTT squareSize={squareSize} />}
        {event.rulesSet.includes('NO_TT_BIKES') && <IconTTLock squareSize={squareSize} />}
        {event.rulesSet.includes('ALLOWS_LATE_JOIN') && (
          <IconLateJoin squareSize={squareSize} />
        )}
        {event.rulesSet.includes('TEST_BIT_10') && <IconDD squareSize={squareSize} />}
        {event.categoryEnforcement && <IconCategoryEnforced squareSize={squareSize} />}
      </>
    </div>
  );
}

export default RulesBox;
