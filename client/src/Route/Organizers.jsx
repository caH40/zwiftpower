import { Route } from 'react-router-dom';
import { lazy } from 'react';

const Organizers = lazy(() => import('../Pages/Organizers/Organizers'));
const OrganizerPublic = lazy(() => import('../Pages/OrganizerPublic/OrganizerPublic'));

export function OrganizersRoute() {
  return (
    <>
      <Route path="/organizers" element={<Organizers />} />
      <Route path="/organizers/:organizerName" element={<OrganizerPublic />} />
    </>
  );
}
