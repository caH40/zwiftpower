import TdRider from '../Td/TdRider';
import { getTimerLocal } from '../../../utils/date-local';

import styles from '../Table.module.css';
import TdRank from '../Td/TdRank';

function TrBlock({ result, index, type }) {
  return (
    result.profileData && (
      <tr>
        <td>
          <TdRank value={index + 1} />{' '}
        </td>
        <td className={styles.td__nowrap}>
          <strong>{result[type]}</strong>
          <small> ватт</small>
        </td>
        <TdRider profileId={result.zwiftId} profile={result.profileData} />
        <td className={styles.td__name}>{result.eventName}</td>
        <td>{getTimerLocal(result.eventStart, 'DDMMYY')}</td>
      </tr>
    )
  );
}

export default TrBlock;
