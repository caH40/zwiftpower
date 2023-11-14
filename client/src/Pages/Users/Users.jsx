import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import { fetchUsersZwiftpower } from '../../redux/features/api/user_zwiftpower/fetchUsersZwiftpower';
import { resetUsers } from '../../redux/features/api/user_zwiftpower/usersZwiftpowerSlice';
import TableUsers from '../../components/Tables/TableUsers/TableUsers';

import styles from './Users.module.css';

function Users() {
  useTitle('Управление пользователями');
  const { users } = useSelector((state) => state.getUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersZwiftpower());

    return () => {
      dispatch(resetUsers());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {users[0] && (
        <section className={styles.wrapper__wide}>
          <TableUsers users={users} />
        </section>
      )}
    </div>
  );
}

export default Users;
