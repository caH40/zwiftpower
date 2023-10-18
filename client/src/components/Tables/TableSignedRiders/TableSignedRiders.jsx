import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { tdHeight, tdLinkZP, tdWeight } from '../utils/td';
import { getAgeCategory } from '../../../utils/event';
import CategoryBox from '../../CategoryBox/CategoryBox';
import useLeader from '../../../hook/useLeaders';
import TdRider from '../Td/TdRider';
import TdCpWattsSchedule from '../Td/TdCpWattsSchedule';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);
const intervalsForDisplay = [15, 300, 2400];

function TableSignedRiders({ riders = [], event }) {
  const [getLeaders, getSweepers] = useLeader(event);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  return (
    <table className={cx('table')}>
      <Thead />
      <tbody>
        {riders.map((rider, index) => (
          <tr className={cx('hover', { current: zwiftId === rider.id })} key={rider._id}>
            <td>{index + 1}</td>
            <td>
              <CategoryBox showLabel={true} label={rider.subgroupLabel} circle={true} />
            </td>
            <TdRider
              profile={{ ...rider, gender: rider.male ? 'MALE' : 'FEMALE' }}
              profileId={rider.id}
              getLeaders={getLeaders}
              getSweepers={getSweepers}
            />

            {/* для "space-between" столбцов */}
            <td></td>

            {/* столбцы с CriticalPower */}
            {intervalsForDisplay.map((interval) => (
              <TdCpWattsSchedule
                key={interval}
                cpBestEfforts={rider.cpBestEfforts}
                interval={interval}
                dimensionValue={'вт/кг'}
              />
            ))}
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

export default TableSignedRiders;
