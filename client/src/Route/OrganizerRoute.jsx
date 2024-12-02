import { Route } from 'react-router-dom';
import { lazy } from 'react';

const Organizer = lazy(() => import('../Pages/Organizer/Organizer'));

export function OrganizerRoute(isOrganizer) {
  return <>{isOrganizer && <Route path="organizer" element={<Organizer />} />}</>;
}
