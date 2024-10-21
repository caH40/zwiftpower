import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import { fetchRiderRacingScore } from '../../../redux/features/api/riderRacingScoreSlice';
import useTitle from '../../../hook/useTitle';
import useScreenOrientation from '../../../hook/useScreenOrientation';
import useChartRacingScore from '../../../hook/chart/useChartRacingScore';

/**
 * Страница с диаграммой изменения Racing Score.
 */
function ProfileRacingScore() {
  useTitle('Диаграмма Racing Score');
  const { isPortrait } = useScreenOrientation();
  const { zwiftId } = useParams();
  const { user } = useSelector((state) => state.checkAuth.value);

  const { racingScores } = useSelector((state) => state.riderRacingScore);

  // данные для диаграммы
  const { data, options } = useChartRacingScore(racingScores, isPortrait);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentZwiftId = zwiftId === 'me' ? user.zwiftId : zwiftId;
    if (!currentZwiftId) {
      return;
    }
    dispatch(fetchRiderRacingScore({ zwiftId: currentZwiftId }));
  }, [dispatch, zwiftId, user]);

  return (
    <section>
      <Line options={options} data={data} />
    </section>
  );
}

export default ProfileRacingScore;
