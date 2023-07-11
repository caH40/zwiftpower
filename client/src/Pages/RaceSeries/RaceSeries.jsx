import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableSeries from '../../components/Tables/TableSeries/TableResults';
import { fetchSeries } from '../../redux/features/api/seriesSlice';

function RaceSeries() {
  const series = useSelector((state) => state.fetchSeries.series);
  useTitle('Серии и Туры заездов');
  useBackground(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  return (
    <section>
      {series[0] && (
        <>
          <TableSeries series={series} />
        </>
      )}
    </section>
  );
}

export default RaceSeries;
