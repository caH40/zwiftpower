import classNames from 'classnames/bind';

import TdRider from '../Td/TdRider';
import { getTimerLocal } from '../../../utils/date-local';

import styles from '../Table.module.css';
import TdRank from '../Td/TdRank';

const cx = classNames.bind(styles);

function TrBlock({ result, zwiftId, index, type }) {
  return (
    result.profileData && (
      <tr className={cx('hover', { current: zwiftId === result.zwiftId })}>
        <td className={styles.center}>
          <TdRank value={index + 1} />{' '}
        </td>
        <td className={styles.td__nowrap}>
          <strong>{type === 'watts' ? result[type] : result[type]?.toFixed(2)}</strong>
          <small>{type === 'watts' ? '  ватт' : ' вт/кг'}</small>
        </td>
        <TdRider profileId={result.zwiftId} profile={result.profileData} />
        <td className={styles.td__name}>{result.eventName}</td>
        <td>{getTimerLocal(result.eventStart, 'DDMMYY')}</td>
      </tr>
    )
  );
}

export default TrBlock;
