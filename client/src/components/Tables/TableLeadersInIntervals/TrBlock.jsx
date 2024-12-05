import { Link } from 'react-router-dom';

import TdRider from '../Td/TdRider';
import { getTimerLocal } from '../../../utils/date-local';
import IconEdit from '../../icons/IconEdit';

import TdRank from '../Td/TdRank';

import styles from '../Table.module.css';

function TrBlock({ result, index, type, isAdmin }) {
  return (
    result.profileData && (
      <tr className={styles.hover}>
        <td className={styles.centerTd}>
          <TdRank value={index + 1} />{' '}
        </td>
        <td className={styles.td__nowrap}>
          <strong>{type === 'watts' ? result[type] : result[type]?.toFixed(2)}</strong>
          <small>{type === 'watts' ? '  ватт' : ' вт/кг'}</small>
        </td>
        <TdRider profileId={result.zwiftId} profile={result.profileData} />
        <td className={styles.td__name}>{result.eventName}</td>
        <td>{getTimerLocal(result.eventStart, 'DDMMYY')}</td>

        {/* Модерация данных райдера */}
        {isAdmin && (
          <td>
            <Link to={`/admin/riders/${result.zwiftId}/main`}>
              <IconEdit squareSize={20} />
            </Link>
          </td>
        )}
      </tr>
    )
  );
}

export default TrBlock;
