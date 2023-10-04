import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import useBackground from '../../hook/useBackground';
import useTitle from '../../hook/useTitle';
import { fetchLeadersInIntervals } from '../../redux/features/api/leadersInIntervals/fetchLeadersInIntervals';
import { resetLeadersInIntervals } from '../../redux/features/api/leadersInIntervals/leadersInIntervalsSlice';
import TableLeadersInIntervals from '../../components/Tables/TableLeadersInIntervals/TableLeadersInIntervals';

function LeadersInIntervals() {
  useTitle('Рейтинг райдеров по мощности');
  useBackground(false);
  const { maxWatts, maxWattsPerKg } = useSelector((state) => state.leadersInIntervalsFetch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeadersInIntervals());
    return () => dispatch(resetLeadersInIntervals());
  }, []);

  return (
    <div>
      {maxWatts?.length ? (
        <>
          <h2>Лидеры по абсолютным ваттам</h2>
          <TableLeadersInIntervals leadersInIntervals={maxWatts} type={'watts'} />
        </>
      ) : null}
      {maxWatts?.length ? (
        <>
          <h2>Лидеры по удельным ваттам</h2>
          <TableLeadersInIntervals leadersInIntervals={maxWattsPerKg} type={'wattsPerKg'} />
        </>
      ) : null}
    </div>
  );
}

export default LeadersInIntervals;
