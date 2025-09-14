import classnames from 'classnames/bind';

import { tdHeight, tdLinkZP } from '../utils/td';
import { getAgeCategory } from '../../../utils/age';
import CategoryBox from '../../CategoryBox/CategoryBox';
import TdRider from '../Td/TdRider';
import TdWeight from '../Td/TdWeight';
import CategoryRSBox from '../../CategoryRSBox/CategoryRSBox';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableTeamMembers({ riders = [], caption, Control, controlHandlers }) {
  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>{caption}</caption>
      <Thead />
      <tbody>
        {riders.map((rider, index) => (
          <tr className={cx('hover')} key={rider._id}>
            <td>{index + 1}</td>
            <td>
              <CategoryBox
                showLabel={true}
                label={rider.competitionMetrics?.category}
                circle={true}
              />
            </td>
            <TdRider
              profile={{ ...rider, gender: rider.male ? 'MALE' : 'FEMALE' }}
              profileId={rider.zwiftId}
            />

            <td>
              <CategoryRSBox
                racingScore={rider.competitionMetrics?.racingScore || 0}
                zwiftId={rider.id}
              />
            </td>

            <TdWeight weight={rider.weight} zwiftId={rider.id} />
            <td>{tdHeight(rider.height / 10)}</td>
            <td>{getAgeCategory(rider.age)}</td>
            <td className={cx('link')}>{tdLinkZP(rider.id)}</td>

            <td>
              <Control
                userId={rider.userId}
                name={`${rider.firstName} ${rider.lastName}`}
                controlHandlers={controlHandlers}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableTeamMembers;
