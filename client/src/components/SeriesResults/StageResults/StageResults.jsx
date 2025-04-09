import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import UnderConstruction from '../../UnderConstruction/UnderConstruction';
import { fetchGetStageResults } from '../../../redux/features/api/series/fetchSeries';

import styles from './StageResults.module.css';

/**
 * Страница с результатами этапа Серии заездов.
 */
export default function StageResults() {
  const { urlSlug, stageOrder } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStageResults({ urlSlug, stageOrder }));
  }, [urlSlug, stageOrder]);

  return (
    <div className={styles.wrapper}>
      <UnderConstruction />
    </div>
  );
}
