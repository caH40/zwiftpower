import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import TdRider from '../Td/TdRider';
import TdRank from '../Td/TdRank';
import CategoryBoxFull from '../../CategoryBoxFull/CategoryBoxFull';
import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

/**
 *
 * @param {Object} props
 * @param {Leaderboard} props.leaderboard - Лидеры по победам, три места по количеству побед в каждой группе.
 */
function TableCatchupLeaders({ leaderboard }) {
  const { role } = useSelector((state) => state.checkAuth.value.user);

  const isModerator = ['admin', 'moderator'].includes(role);

  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>Лидеры по победам в группах</caption>
      <Thead isModerator={isModerator} />
      <tbody>
        {leaderboard
          .filter(({ leaders }) => !!leaders.length)
          .map((groupWithLeaders) => (
            <Fragment key={groupWithLeaders.category}>
              <tr>
                <td colSpan={3}>
                  <CategoryBoxFull
                    showLabel={true}
                    label={
                      groupWithLeaders.category !== 'E' ? groupWithLeaders.category : 'APlus'
                    }
                    full={true}
                  />
                </td>
                {/* <td colSpan={3}>{`Группа ${groupWithLeaders.category}`}</td> */}
              </tr>

              {groupWithLeaders.leaders.map((leader, index) => (
                <tr className={styles.hover} key={leader.zwiftId}>
                  <td className={cx('onlyContent', 'centerTd')}>
                    <TdRank value={index + 1} />
                  </td>
                  <TdRider profileId={leader.profileId} profile={leader.profileData} />
                  <td>{leader.wins}</td>
                </tr>
              ))}
            </Fragment>
          ))}
      </tbody>
    </table>
  );
}

export default TableCatchupLeaders;
