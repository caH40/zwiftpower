import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { useSortSignedRiders } from '../../../hook/useSortSignedRiders';
import { tdHeight, tdLinkZP, tdWeight } from '../utils/td';
import { getAgeCategory } from '../../../utils/age';
import CategoryMF from '../../CategoryMF/CategoryMF';
import useLeader from '../../../hook/useLeaders';
import TdRider from '../Td/TdRider';
import TdCpWatts from '../Td/TdCpWatts';

import styles from '../Table.module.css';

import Thead from './Thead';
import { ridersColumnsCP } from './column-titles';

const cx = classnames.bind(styles);

function TableRiders({ riders = [], event }) {
  const [getLeaders, getSweepers] = useLeader(event);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  return (
    <table className={cx('table')}>
      <Thead />
      <tbody>
        {riders.map((rider) => (
          <tr className={cx('hover', { current: zwiftId === rider.zwiftId })} key={rider._id}>
            <td>{rider.sequenceNumber}</td>
            <td>
              <CategoryMF
                male={rider.male}
                category={rider.competitionMetrics?.category}
                categoryWomen={rider.competitionMetrics?.categoryWomen}
              />
            </td>
            <TdRider
              profile={{ ...rider, gender: rider.male ? 'MALE' : 'FEMALE' }}
              profileId={rider.zwiftId}
              getLeaders={getLeaders}
              getSweepers={getSweepers}
            />
            <td>{rider.totalEvents}</td>
            <td>{rider.competitionMetrics?.racingScore || 0}</td>
            {/* столбцы с CriticalPower */}
            {ridersColumnsCP.map((column) => (
              <TdCpWatts
                cpBestEfforts={rider.cpBestEfforts}
                interval={column.interval}
                key={column.id}
              />
            ))}
            <td>{tdWeight(rider.weight)}</td>
            <td>{tdHeight(rider.height / 10)}</td>
            <td>{getAgeCategory(rider.age)}</td>
            <td className={cx('link')}>{tdLinkZP(rider.zwiftId)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableRiders;
