import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableCatchup from '../../components/Tables/TableCatchup/TableCatchup';
import { fetchResultsSeries } from '../../redux/features/api/resultsSeriesSlice';

function Catchup() {
  const catchups = useSelector((state) => state.fetchResultsSeries.results);
  useTitle('Догонялки');
  useBackground(false);
  console.log(catchups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResultsSeries({ type: 'catchUp' }));
  }, [dispatch]);

  return <section>{catchups[0] && <>{/* <TableCatchup catchups={catchups} /> */}</>}</section>;
}

export default Catchup;
