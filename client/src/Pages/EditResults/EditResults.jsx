import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableRaceResultsEdit from '../../components/Tables/TableRaceResultsEdit/TableRaceResultsEdit';
import NavBarResultsRaceTable from '../../components/UI/NavBarResultsRaceTable/NavBarResultsRaceTable';
import ServiceBox from '../../components/ServiceBox/ServiceBox';
import { getTimerLocal } from '../../utils/date-local';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent, resetResults } from '../../redux/features/api/eventResultSlice';
import { setSortColumnTable } from '../../redux/features/sortTableSlice';
import { fetchResultEdit } from '../../redux/features/api/result_edit/fetchResultEdit';

import styles from './EditResults.module.css';

function EditResults() {
  const { eventData, resultsPrepared } = useSelector((state) => state.fetchEventResult);
  useTitle('Модерация результатов заезда');

  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilterCategory());
    dispatch(setSortColumnTable());
    dispatch(fetchResultEvent(eventId));

    return () => dispatch(resetResults());
  }, [eventId, dispatch]);

  const handlerCheckboxDSQ = (e) => {
    const { name, checked } = e.target;

    const data = {
      property: 'disqualification',
      value: checked ? 'DSQ' : 'none',
      id: name,
      message: 'Общая дисквалификация',
    };

    dispatch(fetchResultEdit(data));
  };

  return (
    <div className={styles.wrapper}>
      {eventData?.id && (
        <>
          <h2 className={styles.title}>{eventData.name}</h2>
          <h3 className={styles.subtitle}>
            {getTimerLocal(eventData.eventStart, 'DDMMYYHm', true)}
          </h3>
          <NavBarResultsRaceTable results={resultsPrepared} />

          <section className={styles.wrapper__wide}>
            <TableRaceResultsEdit
              results={resultsPrepared}
              event={eventData}
              handlerCheckboxDSQ={handlerCheckboxDSQ}
            />
            <ServiceBox
              updated={eventData.updated}
              modifiedResults={eventData.modifiedResults}
            />
          </section>
        </>
      )}
    </div>
  );
}

export default EditResults;
