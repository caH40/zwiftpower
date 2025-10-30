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
        {teams.map((rider, index) => (
          <tr className={cx('hover')} key={rider._id}>
            <td>{index + 1}</td>

            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
