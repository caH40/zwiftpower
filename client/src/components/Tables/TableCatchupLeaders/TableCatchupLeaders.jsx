import classnames from 'classnames/bind';

import { useSelector } from 'react-redux';

import styles from '../Table.module.css';

import TdRider from '../Td/TdRider';

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
        {leaderboard.map((groupWithLeaders) => (
          <>
            <tr key={groupWithLeaders.id}>
              <td colSpan={3}>{`Группа ${groupWithLeaders.category}`}</td>
            </tr>

            {groupWithLeaders.leaders.map((leader) => (
              <tr className={styles.hover} key={leader.id}>
                <td>{leader.rank}</td>
                <TdRider profileId={leader.profileId} profile={leader.profileData} />
                <td>{leader.wins}</td>
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
}

export default TableCatchupLeaders;
