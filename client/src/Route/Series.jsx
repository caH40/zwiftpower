import { Route } from 'react-router-dom';
import { lazy } from 'react';

const RaceSeries = lazy(() => import('../Pages/RaceSeries/RaceSeries'));
const Catchup = lazy(() => import('../Pages/Catchup/Catchup'));
const SeriesOne = lazy(() => import('../Pages/SeriesOne/SeriesOne'));
const SeriesOneResults = lazy(() =>
  import('../Pages/SeriesOne/SeriesOneResults/SeriesOneResults')
);
const SeriesOneRegulations = lazy(() =>
  import('../Pages/SeriesOne/SeriesOneRegulations/SeriesOneRegulations')
);

export function SeriesRoute() {
  return (
    <>
      <Route path="/race/series" element={<RaceSeries />} />
      <Route path="/race/series/catchup" element={<Catchup />} />
      <Route path="/race/series/catchup/:season" element={<Catchup />} />
      <Route path="/series/:urlSlug" element={<SeriesOne />} />
      <Route path="/series/:urlSlug" element={<SeriesOne />}>
        <Route path="/series/:urlSlug/results" element={<SeriesOneResults />} />
        <Route path="/series/:urlSlug/regulations" element={<SeriesOneRegulations />} />
      </Route>
    </>
  );
}
