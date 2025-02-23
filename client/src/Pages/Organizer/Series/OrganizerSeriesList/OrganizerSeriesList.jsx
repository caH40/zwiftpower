import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchGetSeriesOrganizer } from '../../../../redux/features/api/series/fetchSeries';
import TableSeriesOrganizer from '../../../../components/Tables/TableSeriesOrganizer/TableSeriesOrganizer';

import styles from './OrganizerSeriesList.module.css';

/**
 * Страница со всеми сериями заездов, созданных Организатором.
 */
export default function OrganizerSeriesList({ organizerId }) {
  const { series } = useSelector((state) => state.seriesOrganizer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetSeriesOrganizer({ organizerId }));
  }, []);

  // console.log(series);

  return (
    <section className={styles.wrapper}>
      {!!series?.length && <TableSeriesOrganizer series={series} organizerId={organizerId} />}
    </section>
  );
}
