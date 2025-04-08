import { Route } from 'react-router-dom';
import { lazy } from 'react';

import StageResults from '../components/SeriesResults/StageResults/StageResults';

const Series = lazy(() => import('../Pages/Series/Series'));
const SeriesOneLayout = lazy(() => import('../Pages/SeriesOne/SeriesOneLayout'));
const SeriesOneResults = lazy(() =>
  import('../Pages/SeriesOne/SeriesOneResults/SeriesOneResults')
);
const SeriesOneSchedule = lazy(() =>
  import('../Pages/SeriesOne/SeriesOneSchedule/SeriesOneSchedule')
);
const SeriesOneRegulations = lazy(() =>
  import('../Pages/SeriesOne/SeriesOneRegulations/SeriesOneRegulations')
);

export function SeriesRoute() {
  return (
    <>
      <Route path="/series" element={<Series />} />
      <Route path="/series/:urlSlug" element={<SeriesOneLayout />}>
        <Route path="/series/:urlSlug/schedule" element={<SeriesOneSchedule />} />
        <Route path="/series/:urlSlug/results" element={<SeriesOneResults />}>
          <Route path="/series/:urlSlug/results/stage/:order" element={<StageResults />} />
        </Route>

        <Route path="/series/:urlSlug/regulations" element={<SeriesOneRegulations />} />
      </Route>
    </>
  );
}
