import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HelmetSeries } from '../../components/Helmets/HelmetSeries';
import useTitle from '../../hook/useTitle';
import TableSeries from '../../components/Tables/TableSeries/TableResults';
import { fetchSeries } from '../../redux/features/api/seriesSlice';

function RaceSeries() {
  const series = useSelector((state) => state.fetchSeries.series);
  useTitle('Серии и Туры заездов');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  return (
    <section>
      <HelmetSeries />
      {series[0] && (
        <>
          <TableSeries series={series} />
        </>
      )}
    </section>
  );
}

export default RaceSeries;
