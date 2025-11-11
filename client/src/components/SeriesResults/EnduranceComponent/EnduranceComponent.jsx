import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { fetchGeneralClassification } from '../../../redux/features/api/series/fetchSeries';
import { resetGeneralClassificationStages } from '../../../redux/features/api/series/seriesPublicSlice';
import JSONBlock from '../../JSONBlock/JSONBlock';

/**
 * Компонент отображения результатов серии заездов типа Endurance.
 */
export default function EnduranceComponent() {
  const {
    generalClassification,
    seriesPublicOne: { urlSlug, orderedStages },
  } = useSelector((state) => state.seriesPublic);

  const location = useLocation();
  const dispatch = useDispatch();

  const isParentPath = location.pathname === `/series/${urlSlug}/results`;
  // Запрос на получение данных для итоговых страниц серии.
  useEffect(() => {
    if (!isParentPath) {
      return undefined;
    }
    dispatch(fetchGeneralClassification({ urlSlug }));

    return () => dispatch(resetGeneralClassificationStages());
  }, [isParentPath, dispatch, urlSlug]);

  console.log(generalClassification);

  return (
    <div>
      <JSONBlock json={generalClassification} />{' '}
    </div>
  );
}
