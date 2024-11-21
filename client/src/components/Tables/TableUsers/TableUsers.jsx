import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import TdBoolean from '../Td/TdBoolean';
import Copy from '../../UI/Copy/Copy';
import TdZwiftIdAdditional from '../Td/TdZwiftIdAdditional';
import { getTimerLocal } from '../../../utils/date-local';
import LogoRider from '../../LogoRider/LogoRider';

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
            <td>
              <div className={styles.rider__logo}>
                <LogoRider
                  source={user.imageSrc}
                  firstName={user.firstName}
                  lastName={user.lastName}
                />
              </div>
            </td>

            <td>
              {user.zwiftId ? (
                <Link to={`/profile/${user.zwiftId}/results`} className="link">
                  {`${user.firstName} ${user.lastName}`}
                </Link>
              ) : null}
            </td>

            <td>
              <Link to={`/admin/users/${user._id}/main`} className="link">
                {user.username}
              </Link>
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
              {!!user.zwiftId && (
                <Link
                  className={cx('link')}
                  to={`https://zwiftpower.com/profile.php?z=${user.zwiftId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  zp.com
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableUsers;
