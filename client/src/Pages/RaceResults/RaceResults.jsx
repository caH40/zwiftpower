import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useTitle from '../../hook/useTitle';
import TableRaceResults from '../../components/Tables/TableRaceResults/TableRaceResults';
import DescriptionEventZwiftNew from '../../components/DescriptionEventZwiftNew/DescriptionEventZwiftNew';
import NavBarResultsRace from '../../components/UI/NavBarResultsRace/NavBarResultsRace';
import { getTimerLocal } from '../../utils/date-local';
import { HelmetRaceResults } from '../../components/Helmets/HelmetRaceResults';
import { resetFilterCategory } from '../../redux/features/filterCategorySlice';
import { fetchResultEvent, resetResults } from '../../redux/features/api/eventResultSlice';
import { initialSorting } from '../../redux/features/sortTableSlice';
import ServiceBox from '../../components/ServiceBox/ServiceBox';
import { raceTypes } from '../../assets/zwift/race-type';

import styles from './RaceResults.module.css';

function RaceResults() {
  const { eventData, resultsPrepared } = useSelector((state) => state.fetchEventResult);

  useTitle('Результаты заезда');

  const { eventId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialSorting({ columnName: 'Время', isRasing: true }));
    dispatch(fetchResultEvent(eventId));

    window.yaContextCb.push(() => {
      window.Ya.Context.AdvManager.render({
        blockId: 'R-A-5165832-3',
        renderTo: 'yandex_rtb_R-A-5165832-3',
      });
    });

    return () => {
      dispatch(resetFilterCategory());
      dispatch(resetResults());
    };
  }, [eventId, dispatch]);

  useEffect(() => {
    if (eventData.typeRaceCustom === 'classicGroup') {
      dispatch(initialSorting({ columnName: 'Категория', isRasing: true }));
    }
  }, [eventData]);

  return (
    <>
      <section className={styles.wrapper}>
        <HelmetRaceResults
          eventId={eventId}
          image={eventData.imageUrl}
          clubName={eventData.clubName}
          name={eventData.name}
          eventStart={getTimerLocal(eventData.eventStart, 'DDMMYY')}
          typeRaceCustom={
            raceTypes.find((race) => race.value === eventData.typeRaceCustom)?.name
          }
        />
        {eventData?.id && (
          <>
            <DescriptionEventZwiftNew event={eventData} eventId={eventId} />
            <NavBarResultsRace results={resultsPrepared} />

            <section className={styles.wrapper__wide}>
              <TableRaceResults results={resultsPrepared} event={eventData} />
              <ServiceBox
                updated={eventData.updated}
                modifiedResults={eventData.modifiedResults}
              />
            </section>
          </>
        )}
      </section>
      <div id="yandex_rtb_R-A-5165832-3"></div>
    </>
  );
}

export default RaceResults;
