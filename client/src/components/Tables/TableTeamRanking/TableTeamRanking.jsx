import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

export default function TableTeamRanking({ teams = [] }) {
  return (
    <table className={styles.table}>
      <caption className={styles.hidden}>Рейтинг команд</caption>
      <Thead />
      <tbody>
        {teams.map(
          ({
            _id,
            urlSlug,
            shortName,
            logoFileInfo,
            rank,
            rankPoints,
            totalMembers,
            averageRacingScore,
            totalResults,
            eventMedals,
          }) => (
            <tr className={cx('hover')} key={_id}>
              <td>{rank}</td>

              <td></td>
              <td>{eventMedals.gold}</td>
              <td>{eventMedals.silver}</td>
              <td>{eventMedals.bronze}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
