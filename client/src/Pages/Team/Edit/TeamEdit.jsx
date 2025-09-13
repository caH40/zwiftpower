import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { allowForTeamCreator } from '../../../utils/check-team-creator';
import useTitle from '../../../hook/useTitle';

import styles from './TeamEdit.module.css';

/**
 * Страница управления/редактирования командой.
 */
export default function TeamEditPage() {
  useTitle('Управление командой');
  const { urlSlug } = useParams();
  const {
    status,
    user: { team: userInTeam },
  } = useSelector((state) => state.checkAuth.value);
  const { team } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  const showPage = allowForTeamCreator({ status, teamIdForPermission: team?._id, userInTeam });
  // Если пользователь не создатель команды - редирект на 404
  if (!showPage) {
    return <Navigate to="/404" replace />;
  }
  return <div className={styles.wrapper}></div>;
}
