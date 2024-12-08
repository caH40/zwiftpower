import { useSelector } from 'react-redux';

import IconAdmin2 from '../../icons/IconAdmin2';

import styles from './ListMenu.module.css';
import ItemMenuSideLeft from './ItemMenuSideLeft/ItemMenuSideLeft';

function ListMenuAdmin({ state }) {
  const { user } = useSelector((state) => state.checkAuth.value);

  const isAdmin = ['admin'].includes(user.role);

  return (
    <ul className={styles.list}>
      {isAdmin && (
        <ItemMenuSideLeft to={'/admin'} Icon={IconAdmin2} name={'Админ'} state={state} />
      )}
    </ul>
  );
}

export default ListMenuAdmin;
