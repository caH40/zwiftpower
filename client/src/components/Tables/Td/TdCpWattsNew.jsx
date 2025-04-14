import { useSelector } from 'react-redux';
import cn from 'classnames/bind';

import { roundValue } from '../../../utils/round';

import HighlightValueMax from './HighlightValueMax';

import styles from './Td.module.css';

const cx = cn.bind(styles);

function TdCpWattsNew({ hoverEnabled, cpBestEfforts = [], interval, ...props }) {
  const { column } = useSelector((state) => state.filterWatts.value);

  const dimension = column === 'watts' ? 'integer' : 'hundred';
  const dimensionValue = column === 'watts' ? 'вт' : 'вт/кг';
  const cp = cpBestEfforts.find((cp) => cp.duration === interval)?.[column] || null;

  const valueCPRounded = roundValue(cp, dimension);

  return (
    <td {...props} className={cx({ hover__cell: hoverEnabled })}>
      <HighlightValueMax valueCPRounded={valueCPRounded} dimensionValue={dimensionValue} />
    </td>
  );
}

export default TdCpWattsNew;
