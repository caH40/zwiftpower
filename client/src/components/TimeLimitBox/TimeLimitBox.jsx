import { dsqValues } from '../../assets/dsq';
import { secondesToTimeThousandths } from '../../utils/date-convert';
import DSQBox from '../DSQBox/DSQBox';

/**
 * Иконка для отображения по лимиту времени на этапе.
 * @param {object} props
 * @param {{
 *    isOutside:boolean;
 *    exceededMilliseconds:number;
 * }} props.finishTimeLimit
 * @param {{
 *    enforcement:'manual' | 'auto';
 *    percentageFromLeader: number;
 * }} props.finishTimeLimitOnStage
 * @returns
 */
export default function TimeLimitBox({ finishTimeLimit, finishTimeLimitOnStage }) {
  const label = dsqValues.find((e) => e.type === 'FINISH_TIME_LIMIT')?.label ?? 'LMT';

  const overTime = secondesToTimeThousandths(finishTimeLimit.exceededMilliseconds);

  return (
    <DSQBox
      tooltip={`Превышение лимита времени (${finishTimeLimitOnStage.percentageFromLeader}%) на ${overTime}`}
      addCls="box__inline"
    >
      {label}
    </DSQBox>
  );
}
