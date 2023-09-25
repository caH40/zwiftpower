import { roundValue } from '../../../utils/round';

import styles from './Td.module.css';
import DefineCategory from './DefineCategory';
import HighlightValueMax from './HighlightValueMax';

function TdCpWattsSchedule({ cpBestEfforts = [], dimensionValue, interval }) {
  const { value: valueRaw, addition: valueAdditionCP } =
    cpBestEfforts.find((cp) => cp.duration === interval)?.wattsKg || null;

  const valueCPRounded = roundValue(valueAdditionCP, 'ten');

  return (
    <td className={styles.cursor__default}>
      <DefineCategory cpBestEfforts={cpBestEfforts} interval={interval}>
        <HighlightValueMax
          valueCPRounded={valueCPRounded}
          dimensionValue={dimensionValue}
          valueRaw={valueRaw}
          interval={interval}
        />
      </DefineCategory>
    </td>
  );
}

export default TdCpWattsSchedule;
