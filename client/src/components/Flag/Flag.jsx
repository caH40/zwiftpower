import { COUNTRY_CODE_MAP } from '../../assets/constants';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './Flag.module.css';

/**
 * Отображение флага страны name.
 */
function Flag({ name = '', width, height }) {
  const nameShort = COUNTRY_CODE_MAP[name] ?? name.slice(0, 2);

  return (
    <MyTooltip tooltip={name}>
      <img
        className={styles.box}
        src={`/images/flags/${nameShort}.svg`}
        alt={`flag-${name}`}
        width={width}
        height={height}
      />
    </MyTooltip>
  );
}

export default Flag;
