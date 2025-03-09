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
import IconScoreBased from '../icons/IconScoreBased';
import IconViewWorld from '../icons/IconViewWorld';
import IconWomenOnly from '../icons/IconWomenOnly';

import { enabledRule, enabledRuleInSubgroups, enabledRuleInTag } from './utils';

import styles from './RulesBox.module.css';

/**
 * Блок отображения правил в заезде в виде перечная иконок соответствующих настроек.
 */
function RulesBox({ event, squareSize = 24, addCls }) {
  // Проверка, что включена категориазция по рейтинговым очкам.
  // Подразумевается, что категоризация по очкам не происходит
  // одновременно с другими категоризациями (по категориям, по мощности и т.д.).
  const hasRacingScore = event.accessExpression?.includes('scoring');

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
        {enabledRuleInSubgroups(event, 'LADIES_ONLY') && (
          <IconWomenOnly squareSize={squareSize} />
        )}

        {event.categoryEnforcement &&
          (hasRacingScore ? (
            <IconScoreBased squareSize={squareSize} />
          ) : (
            <IconCategoryEnforced squareSize={squareSize} />
          ))}

        {event.cullingType === 'CULLING_EVENT_ONLY' && (
          <IconViewEvent squareSize={squareSize} />
        )}

        {event.cullingType === 'CULLING_SUBGROUP_ONLY' && (
          <IconViewGroup squareSize={squareSize} />
        )}

        {event.cullingType === 'CULLING_EVERYBODY' && <IconViewWorld squareSize={squareSize} />}

        {enabledRuleInTag(event, 'steering_disabled') && (
          <IconSteeringDisabled squareSize={squareSize} />
        )}

        {enabledRuleInTag(event, 'ttbikesdraft') && <IconTTT squareSize={squareSize} />}
      </>
    </div>
  );
}

export default RulesBox;
