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
import IconRubberBanding from '../icons/IconRubberBanding';
import IconViewEvent from '../icons/IconViewEvent';
import IconViewGroup from '../icons/IconViewGroup';
import IconSteeringDisabled from '../icons/IconSteeringDisabled';
import IconTTT from '../icons/IconTTT';

import { enabledRule, enabledRuleInTag } from './utils';

import styles from './RulesBox.module.css';

function RulesBox({ event, squareSize = 24, addCls }) {
  return (
    <div className={cn(styles.block, cns(styles, addCls))}>
      <>
        {enabledRule(event, 'SHOW_RACE_RESULTS') && <IconShowResults squareSize={squareSize} />}
        {enabledRule(event, 'ENFORCE_NO_ZPOWER') && <IconPowerMeter squareSize={squareSize} />}
        {enabledRule(event, 'ENFORCE_HRM') && <IconHeartMonitor squareSize={squareSize} />}
        {enabledRule(event, 'NO_POWERUPS') && <IconPowerUp squareSize={squareSize} />}
        {enabledRule(event, 'NO_DRAFTING') && <IconTT squareSize={squareSize} />}
        {enabledRule(event, 'NO_TT_BIKES') && <IconTTLock squareSize={squareSize} />}
        {enabledRule(event, 'ALLOWS_LATE_JOIN') && <IconLateJoin squareSize={squareSize} />}
        {enabledRule(event, 'TEST_BIT_10') && <IconRubberBanding squareSize={squareSize} />}
        {event.categoryEnforcement && <IconCategoryEnforced squareSize={squareSize} />}
        {event.cullingType === 'CULLING_EVENT_ONLY' && (
          <IconViewEvent squareSize={squareSize} />
        )}
        {event.cullingType === 'CULLING_SUBGROUP_ONLY' && (
          <IconViewGroup squareSize={squareSize} />
        )}
        {enabledRuleInTag(event, 'steering_disabled') && (
          <IconSteeringDisabled squareSize={squareSize} />
        )}
        {enabledRuleInTag(event, 'ttbikesdraft') && <IconTTT squareSize={squareSize} />}
      </>
    </div>
  );
}

export default RulesBox;
