import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import TableRaceResults from '../../components/Tables/TableRaceResults/TableRaceResults';
import DescriptionEventZwift from '../../components/DescriptionEventZwift/DescriptionEventZwift';
import { getResults } from '../../api/race/results';
import { gapValue } from '../../utils/gap';
import { setValueMax } from '../../utils/value-max';
import { filterThousandths } from '../../utils/thousandths-seconds';

function RaceResults() {
  const [event, setEvent] = useState({});
  const [results, setResults] = useState([]);
  useTitle('Результаты заезда');
  useBackground(false);
  const { eventId } = useParams();

  useEffect(() => {
    getResults(eventId).then((response) => {
      const { results: resultsRow, ...eventRow } = response.data.event;
      const resultsWithGaps = gapValue(resultsRow);

      filterThousandths(resultsWithGaps); // мутирует массив;
      setEvent(eventRow);
      setResults(setValueMax(resultsWithGaps));
    });
  }, [eventId]);

  return (
    <section>
      {event?.id ? (
        <>
          <DescriptionEventZwift event={event} />
          <TableRaceResults results={results} />
        </>
      ) : (
        'Заезд не найден!'
      )}
    </section>
  );
}

export default RaceResults;
