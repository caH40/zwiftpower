import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchRidersInEvents } from '../../redux/features/api/statistics/fetchRidersInEvents';
import { resetRidersInEvents } from '../../redux/features/api/statistics/ridersInEventsSlice';
import ChartRidersInEvents from '../../components/ChartRidersInEvents/ChartRidersInEvents';

function RidersInEvents() {
  const { ridersInEventsPrepared, status: fetchStatus } = useSelector(
    (state) => state.ridersInEventsFetch
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRidersInEvents(36000000000));

    // обнуление стора при уходе со страницы
    return () => {
      dispatch(resetRidersInEvents());
    };
  }, []);

  return (
    <section>
      {fetchStatus === 'resolved' && (
        <ChartRidersInEvents ridersInEventsPrepared={ridersInEventsPrepared} />
      )}
    </section>
  );
}
export default RidersInEvents;
