import { Route } from 'react-router-dom';
import { lazy } from 'react';

const OrganizerLayer = lazy(() => import('../Pages/Organizer/OrganizerLayout'));
const Organizer = lazy(() => import('../Pages/Organizer/MainPage/Organizer'));
const OrganizerClubs = lazy(() => import('../Pages/Organizer/Clubs/OrganizerClubs'));
const OrganizerBots = lazy(() => import('../Pages/Organizer/Bots/OrganizerBots'));

export function OrganizerRoute(organizerId) {
  return (
    <>
      {organizerId && (
        <Route path="/organizer" element={<OrganizerLayer organizerId={organizerId} />}>
          <Route path="main" element={<Organizer organizerId={organizerId} />} />
          <Route path="clubs" element={<OrganizerClubs organizerId={organizerId} />} />
          <Route path="bots" element={<OrganizerBots organizerId={organizerId} />} />
        </Route>
      )}
    </>
  );
}
