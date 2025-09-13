import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { allowForTeamCreator } from '../../../utils/check-team-creator';
import { NavBarTeamControl } from '../../../components/UI/NavBarTeamControl/NavBarTeamControl';

import useTitle from '../../../hook/useTitle';

import styles from './TeamControlLayout.module.css';
/**
 * Страница управления/редактирования командой.
 */
export default function TeamControlLayout() {
  useTitle('Управление командой');

  const {
    status,
    user: { team: userInTeam },
  } = useSelector((state) => state.checkAuth.value);
  const { team } = useSelector((state) => state.team);

  const showPage = allowForTeamCreator({ status, teamIdForPermission: team?._id, userInTeam });
  // Если пользователь не создатель команды - редирект на 404
  // if (!showPage) {
  //   return <Navigate to="/404" replace />;
  // }
  return (
    <div className={styles.wrapper}>
      {/* Кнопки навигации по страницам организатора */}
      <div className={styles.box__navbar}>
        <NavBarTeamControl urlSlug={team?.urlSlug} />
      </div>

      <Outlet />
    </div>
  );
}
