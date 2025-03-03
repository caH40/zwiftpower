import { Route } from 'react-router-dom';
import { lazy } from 'react';

const OrganizersPublic = lazy(() => import('../Pages/OrganizersPublic/OrganizersPublic'));
const OrganizerPublicLayout = lazy(() =>
  import('../Pages/OrganizerPublic/OrganizerPublicLayout')
);
const OrganizerSeries = lazy(() => import('../Pages/OrganizerPublic/Series/OrganizerSeries'));
// const OrganizerPublicResults = lazy(() =>
//   import('../Pages/OrganizerPublic/OrganizerPublicResults')
// );
const OrganizerSchedule = lazy(() =>
  import('../Pages/OrganizerPublic/Schedule/OrganizerSchedule')
);

export function OrganizersPublicRoute() {
  return (
    <>
      <Route path="/organizers" element={<OrganizersPublic />} />
      <Route path="/organizers/:urlSlug" element={<OrganizerPublicLayout />}>
        <Route path="/organizers/:urlSlug/schedule" element={<OrganizerSchedule />} />
        <Route path="/organizers/:urlSlug/series" element={<OrganizerSeries />} />
      </Route>
      {/* <Route path="/organizers/:urlSlug/results" element={<OrganizerPublicResults />} /> */}
    </>
  );
}
