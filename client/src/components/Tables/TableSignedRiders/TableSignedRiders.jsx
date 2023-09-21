import classnames from 'classnames/bind';

import { tdHeight, tdLinkZP, tdWeight } from '../utils/td';
import { getAgeCategory, getGenderStr } from '../../../utils/event';
import CategoryBox from '../../CategoryBox/CategoryBox';
import useLeader from '../../../hook/useLeaders';
import TdRider from '../Td/TdRider';
import TdCpWattsSchedule from '../Td/TdCpWattsSchedule';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableSignedRiders({ riders = [], event }) {
  const [getLeaders, getSweepers] = useLeader(event);

  return (
    <table className={cx('table', 'table_striped')}>
      <Thead />
      <tbody>
        {riders.map((rider, index) => (
          <tr className={cx('hover')} key={rider._id}>
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
            <TdCpWattsSchedule
              cp={rider.powerCurve?.pointsWattsPerKg}
              duration={15}
              dimension={'вт/кг'}
            />
            <TdCpWattsSchedule
              cp={rider.powerCurve?.pointsWattsPerKg}
              duration={300}
              dimension={'вт/кг'}
            />
            <TdCpWattsSchedule
              cp={rider.powerCurve?.pointsWattsPerKg}
              duration={1200}
              dimension={'вт/кг'}
            />
            <td>{tdWeight(rider.weight)}</td>
            <td>{tdHeight(rider.height / 10)}</td>
            <td>{getAgeCategory(rider.age)}</td>
            <td>{getGenderStr(rider.male)}</td>
            <td className={cx('link')}>{tdLinkZP(rider.id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSignedRiders;
