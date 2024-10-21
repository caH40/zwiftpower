import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import { fetchRiderMetrics } from '../../../redux/features/api/riderMetricsSlice';
import useTitle from '../../../hook/useTitle';
import useScreenOrientation from '../../../hook/useScreenOrientation';
import useChartRacingScore from '../../../hook/chart/useChartRacingScore';
import { HelmetProfile } from '../../../components/Helmets/HelmetProfile';
import { fetchUserProfile } from '../../../redux/features/api/userProfileSlice';

import styles from './ProfileRacingScore.module.css';

/**
 * Страница с диаграммой изменения Racing Score.
 */
function ProfileRacingScore() {
  useTitle('Диаграмма Racing Score');
  const { isPortrait } = useScreenOrientation();
  const { zwiftId } = useParams();
  const { user } = useSelector((state) => state.checkAuth.value);
  const { profile } = useSelector((state) => state.fetchUserProfile);
  const { metrics, status: statusFetchStatus } = useSelector((state) => state.riderMetrics);

  // данные для диаграммы
  const { data, options } = useChartRacingScore(metrics, isPortrait);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentZwiftId = zwiftId === 'me' ? user.zwiftId : zwiftId;
    if (!currentZwiftId) {
      return;
    }
    dispatch(fetchRiderMetrics({ zwiftId: currentZwiftId }));
    dispatch(fetchUserProfile({ zwiftId: currentZwiftId }));
  }, [dispatch, zwiftId, user]);

  return (
    <section>
      <HelmetProfile
        profileId={zwiftId}
        firstName={profile.firstName}
        lastName={profile.lastName}
        image={profile.imageSrc}
        page={'racing-score'}
      />
      {statusFetchStatus === 'loading' && <div className={styles.skeleton} />}

      {statusFetchStatus === 'resolved' && <Line options={options} data={data} />}
    </section>
  );
}

export default ProfileRacingScore;
