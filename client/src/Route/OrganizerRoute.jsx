import { Route } from 'react-router-dom';
import { lazy } from 'react';

const OrganizerLayer = lazy(() => import('../Pages/Organizer/OrganizerLayout'));
const Organizer = lazy(() => import('../Pages/Organizer/MainPage/Organizer'));
const OrganizerClubs = lazy(() => import('../Pages/Organizer/Clubs/OrganizerClubs'));
const OrganizerBots = lazy(() => import('../Pages/Organizer/Bots/OrganizerBots'));

export function OrganizerRoute(isOrganizer) {
  return (
    <>
      {isOrganizer && (
        <Route path="/organizer" element={<OrganizerLayer />}>
          <Route path="main" element={<Organizer />} />
          <Route path="clubs" element={<OrganizerClubs />} />
          <Route path="bots" element={<OrganizerBots />} />
        </Route>
      )}
    </>
  );
}
