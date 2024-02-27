import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { useSortSignedRiders } from '../../../hook/useSortSignedRiders';
import { tdHeight, tdLinkZP, tdWeight } from '../utils/td';
import { getAgeCategory } from '../../../utils/age';
import CategoryBox from '../../CategoryBox/CategoryBox';
import useLeader from '../../../hook/useLeaders';
import TdRider from '../Td/TdRider';
import TdCpWatts from '../Td/TdCpWatts';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableRiders({ riders = [], event }) {
  const [getLeaders, getSweepers] = useLeader(event);
  const columnsCP = useSelector((state) => state.columnsCP.value);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  // const ridersSortedAndFiltered = useSortSignedRiders(riders);

  return (
    <table className={cx('table')}>
      <Thead columnsCP={columnsCP} />
      <tbody>
        {riders.map((rider, index) => (
          <tr className={cx('hover', { current: zwiftId === rider.zwiftId })} key={rider._id}>
            <td>{rider.sequenceNumber}</td>
            {/* <td>
              <CategoryBox showLabel={true} label={rider.subgroupLabel} circle={true} />
            </td> */}
            <TdRider
              profile={{ ...rider, gender: rider.male ? 'MALE' : 'FEMALE' }}
              profileId={rider.zwiftId}
              getLeaders={getLeaders}
              getSweepers={getSweepers}
            />
            <td>{rider.totalEvents}</td>
            {/* столбцы с CriticalPower */}
            {columnsCP.map((column) => {
              if (column.isVisible) {
                return (
                  <TdCpWatts
                    cpBestEfforts={rider.cpBestEfforts}
                    interval={column.interval}
                    key={column.id}
                  />
                );
              }
              return null;
            })}
            <td>{tdWeight(rider.weight)}</td>
            <td>{tdHeight(rider.height / 10)}</td>
            <td>{getAgeCategory(rider.age)}</td>
            <td className={cx('link')}>{tdLinkZP(rider.id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableRiders;
