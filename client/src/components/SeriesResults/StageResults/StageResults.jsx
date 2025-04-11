import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import JSONBlock from '../../JSONBlock/JSONBlock';
import { fetchGetStageResults } from '../../../redux/features/api/series/fetchSeries';

import styles from './StageResults.module.css';

/**
 * Страница с результатами этапа Серии заездов.
 */
export default function StageResults() {
  const { urlSlug, stageOrder } = useParams();
  const { stageResults } = useSelector((state) => state.seriesPublic);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStageResults({ urlSlug, stageOrder }));
  }, [urlSlug, stageOrder, dispatch]);

  return (
    <div className={styles.wrapper}>
      <JSONBlock json={stageResults} />
    </div>
  );
}
