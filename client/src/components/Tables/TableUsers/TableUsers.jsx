import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import TdLogo from '../Td/TdLogo';
import TdBoolean from '../Td/TdBoolean';
import Copy from '../../UI/Copy/Copy';
import TdZwiftIdAdditional from '../Td/TdZwiftIdAdditional';
import { getTimerLocal } from '../../../utils/date-local';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

function TableUsers({ users }) {
  return (
    <table className={cx('table')}>
      <caption className={styles.caption}>Зарегистрированные пользователи</caption>
      <Thead />
      <tbody>
        {users.map((user, index) => (
          <tr className={styles.hover} key={user._id}>
            <td>{index + 1}</td>
            <TdLogo srcPicture={user.photoProfile} />

            <td>
              <Copy name={`username "${user.username}"`} showValue={true}>
                {user.username}
              </Copy>
            </td>
            <td>{user.role}</td>
            <td>
              <Copy name={`zwiftId "${user.username}"`} showValue={true}>
                {user.zwiftId}
              </Copy>
            </td>
            <TdZwiftIdAdditional value={user.zwiftIdAdditional} />
            <td>
              <Copy name={`e-mail "${user.username}"`} showValue={true}>
                {user.email}
              </Copy>
            </td>
            <TdBoolean value={user.emailConfirm} />
            <td>{getTimerLocal(user.date)}</td>
            <td>
              <Link
                className={cx('link')}
                to={`https://zwiftpower.com/profile.php?z=${user.zwiftId}`}
                target="_blank"
                rel="noreferrer"
              >
                профиль
              </Link>
            </td>
            <td>
              <Copy name={`_id "${user.username}"`}>{user._id}</Copy>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableUsers;
