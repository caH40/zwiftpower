import { getBgColor } from '../../utils/colors';
import { getBgWidth } from '../../utils/widths';
import { tdWatts } from '../Tables/utils/td';

import styles from './NPandVIBox.module.css';

/**
 * Блок отображения Нормализованной мощности и Индекса вариабельности
 * @param {{variabilityIndex:number}} variabilityIndex индекс вариабельности
 * @param {{normalizedPower:number}} normalizedPower нормализованная мощности
 * @returns
 */
function NPandVIBox({ variabilityIndex, normalizedPower }) {
  const NP = Math.round(normalizedPower);

  return (
    <>
      {normalizedPower || getBgWidth(variabilityIndex) ? (
        <div className={styles.box}>
          invisibleTEXT
          <span className={styles.box__text}>{tdWatts(NP)}</span>
          <div
            className={styles.box__vi}
            style={{
              backgroundColor: getBgColor(variabilityIndex),
              width: `${getBgWidth(variabilityIndex)}%`,
            }}
          ></div>
        </div>
      ) : null}
    </>
  );
}

export default NPandVIBox;
