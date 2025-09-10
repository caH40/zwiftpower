import { useSelector } from 'react-redux';

import IconOrganizer from '../../icons/IconOrganizer';
import IconZwiftEdit from '../../icons/IconZwiftEdit';

import styles from './ListMenu.module.css';
import ItemMenuSideLeft from './ItemMenuSideLeft/ItemMenuSideLeft';

export default function ListMenuModeratorClub({ state }) {
  const { user } = useSelector((state) => state.checkAuth.value);

  const isModeratorClub = !!user.moderator?.clubs?.length;

  const isModerator = ['admin', 'moderator'].includes(user.role);

  return (
    <ul className={styles.list}>
      {(isModerator || isModeratorClub) && (
        <ItemMenuSideLeft
          to={'/zwift'}
          Icon={IconZwiftEdit}
          name={'Zwift'}
          state={state}
          iconProps={{ color: '#CECECE' }}
        />
      )}

      {user.organizer && (
        <ItemMenuSideLeft
          to={'/organizer/main'}
          Icon={IconOrganizer}
          name={'Организатор'}
          iconProps={{ color: '#CECECE' }}
          state={state}
        />
      )}
    </ul>
  );
}
