import TdRider from '../Td/TdRider';
import { getTimerLocal } from '../../../utils/date-local';

import styles from '../Table.module.css';

function TrBlock({ result, index, type }) {
  return (
    result.profileData && (
      <tr>
        <td>{index + 1}</td>
        <td className={styles.td__nowrap}>{result[type]} ватт</td>
        <TdRider profileId={result.zwiftId} profile={result.profileData} />
        <td className={styles.td__nowrap}>{result.eventName}</td>
        <td>{getTimerLocal(result.eventStart, 'DDMMYY')}</td>
      </tr>
    )
  );
}

export default TrBlock;
