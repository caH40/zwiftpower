import { Link } from 'react-router-dom';
import cn from 'classnames/bind';

import { getWeightStr } from '../../../utils/event';
import { highlightValueMax } from '../utils/td';

import styles from './Td.module.css';

const cx = cn.bind(styles);

/**
 * Ячейка отображения веса.
 * zwiftId не обязательный параметр, при его отсутствии возвращается ячейка без Link.
 */
function TdWeight({ weight, zwiftId }) {
  const valueFormatted = highlightValueMax(getWeightStr(weight), 'кг');
  return (
    <td>
      {zwiftId != null ? (
        <Link className={cx('link')} to={`/profile/${zwiftId}/weight-and-height`}>
          {valueFormatted}
        </Link>
      ) : (
        valueFormatted
      )}
    </td>
  );
}

export default TdWeight;
