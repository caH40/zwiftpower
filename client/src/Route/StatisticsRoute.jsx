import { Route } from 'react-router-dom';
import { lazy } from 'react';

const Statistics = lazy(() => import('../Pages/Statistics/Statistics'));
const RidersInEvents = lazy(() => import('../Pages/Statistics/RidersInEvents'));
const LeadersInIntervals = lazy(() => import('../Pages/Statistics/LeadersInIntervals'));
const RidersTotalFTP = lazy(() => import('../Pages/Statistics/RidersTotalFTP'));

export function StatisticsRoute() {
  return (
    <>
      <Route path="/race/statistics" element={<Statistics />}>
        <Route path="main" element={<RidersInEvents />} />
        <Route path="leaders/male" element={<LeadersInIntervals />} />
        <Route path="leaders/female" element={<LeadersInIntervals />} />
        <Route path="riders-ftp" element={<RidersTotalFTP />} />
      </Route>
    </>
  );
}
