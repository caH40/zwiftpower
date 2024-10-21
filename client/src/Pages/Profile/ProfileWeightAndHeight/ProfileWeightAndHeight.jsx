import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import { HelmetProfile } from '../../../components/Helmets/HelmetProfile';
import useScreenOrientation from '../../../hook/useScreenOrientation';
import useTitle from '../../../hook/useTitle';
import { fetchUserProfile } from '../../../redux/features/api/userProfileSlice';
import { fetchRiderMetrics } from '../../../redux/features/api/riderMetricsSlice';
import useChartWeight from '../../../hook/chart/useChartWeight';
import useChartHeight from '../../../hook/chart/useChartHeight';

import styles from './ProfileWeightAndHeight.module.css';

/**
 * Страница с диаграммами изменения веса и роста.
 */
function ProfileWeightAndHeight() {
  useTitle('Диаграмма изменения веса');
  const { isPortrait } = useScreenOrientation();
  const { zwiftId } = useParams();
  const { user } = useSelector((state) => state.checkAuth.value);
  const { profile } = useSelector((state) => state.fetchUserProfile);
  const { metrics, status: statusFetchStatus } = useSelector((state) => state.riderMetrics);

  // данные для диаграммы
  const { data: dataChartWeight, options: optionsChartWeight } = useChartWeight(
    metrics,
    isPortrait
  );
  // данные для диаграммы
  const { data: dataChartHeight, options: optionsChartHeight } = useChartHeight(
    metrics,
    isPortrait
  );

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
        page={'weight-and-height'}
      />

      {statusFetchStatus === 'loading' && <div className={styles.skeleton} />}

      {statusFetchStatus === 'resolved' && (
        <Line options={optionsChartWeight} data={dataChartWeight} />
      )}

      {statusFetchStatus === 'resolved' && (
        <Line options={optionsChartHeight} data={dataChartHeight} />
      )}
    </section>
  );
}

export default ProfileWeightAndHeight;
