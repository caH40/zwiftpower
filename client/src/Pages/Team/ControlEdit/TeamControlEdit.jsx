import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormCreateTeam from '../../../components/UI/FormTeam/FormCreateTeam';
import { fetchGetTeam } from '../../../redux/features/api/team/fetchTeam';

import styles from './TeamControlEdit.module.css';

/**
 * Страница редактирования настроек команды. (Описание, изображения.)
 */
export default function TeamControlEditPage() {
  const { urlSlug } = useParams();

  const { team } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  const onSuccessUpdate = () => dispatch(fetchGetTeam({ urlSlug }));

  return (
    <div className={styles.wrapper}>
      <FormCreateTeam team={team} onSuccessUpdate={onSuccessUpdate} />
    </div>
  );
}
