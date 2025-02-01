import { Route } from 'react-router-dom';
import { lazy } from 'react';

const OrganizersPublic = lazy(() => import('../Pages/OrganizersPublic/OrganizersPublic'));
// const OrganizerPublicResults = lazy(() =>
//   import('../Pages/OrganizerPublic/OrganizerPublicResults')
// );
const OrganizerPublic = lazy(() => import('../Pages/OrganizerPublic/OrganizerPublic'));

export function OrganizersPublicRoute() {
  return (
    <>
      <Route path="/organizers" element={<OrganizersPublic />} />
      <Route path="/organizers/:urlSlug" element={<OrganizerPublic />} />
      {/* <Route path="/organizers/:urlSlug/results" element={<OrganizerPublicResults />} /> */}
    </>
  );
}
