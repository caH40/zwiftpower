import { useState } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { tdHeight, tdLinkZP } from '../utils/td';
import { getAgeCategory } from '../../../utils/age';
import CategoryMF from '../../CategoryMF/CategoryMF';
import useLeader from '../../../hook/useLeaders';
import TdRider from '../Td/TdRider';
import TdCpWatts from '../Td/TdCpWatts';
import CategoryRSBox from '../../CategoryRSBox/CategoryRSBox';
import TdWeight from '../Td/TdWeight';

import styles from '../Table.module.css';

import Thead from './Thead';
import { ridersColumnsCP } from './column-titles';

const cx = classnames.bind(styles);

function TableRiders({ riders = [], event }) {
  const [getLeaders, getSweepers] = useLeader(event);
  const { zwiftId } = useSelector((state) => state.checkAuth.value.user);

  // id ячеек столбца на который наведен курсор мышки.
  const [columnActive, setColumnActive] = useState(false);

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
            <td>
              <CategoryRSBox
                racingScore={rider.competitionMetrics?.racingScore || 0}
                zwiftId={rider.zwiftId}
              />
            </td>

            {/* столбцы с CriticalPower */}
            {ridersColumnsCP.map((column, indexColumnCP) => {
              const id = `TdCpWatts-${indexColumnCP}`;

              return (
                <TdCpWatts
                  cpBestEfforts={rider.cpBestEfforts}
                  interval={column.interval}
                  key={column.id}
                  id={id}
                  onMouseEnter={() => setColumnActive(id)}
                  onMouseLeave={() => setColumnActive(null)}
                  hoverEnabled={columnActive === id}
                />
              );
            })}
            <TdWeight weight={rider.weight} zwiftId={rider.zwiftId} />
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
