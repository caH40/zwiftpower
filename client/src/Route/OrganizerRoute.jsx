import { Route } from 'react-router-dom';
import { lazy } from 'react';

const OrganizerLayer = lazy(() => import('../Pages/Organizer/OrganizerLayout'));
const Organizer = lazy(() => import('../Pages/Organizer/MainPage/Organizer'));
const OrganizerClubs = lazy(() => import('../Pages/Organizer/Clubs/OrganizerClubs'));
const OrganizerBots = lazy(() => import('../Pages/Organizer/Bots/OrganizerBots'));
const OrganizerSeriesLayout = lazy(() =>
  import('../Pages/Organizer/Series/OrganizerSeriesLayout')
);
const OrganizerSeriesList = lazy(() =>
  import('../Pages/Organizer/Series/OrganizerSeriesList/OrganizerSeriesList')
);
const OrganizerSeriesCreate = lazy(() =>
  import('../Pages/Organizer/Series/OrganizerSeriesCreate/OrganizerSeriesCreate')
);
const OrganizerSeriesEdit = lazy(() =>
  import('../Pages/Organizer/Series/OrganizerSeriesEdit/OrganizerSeriesEdit')
);

export function OrganizerRoute(organizerId) {
  return (
    <>
      {organizerId && (
        <Route path="/organizer" element={<OrganizerLayer organizerId={organizerId} />}>
          <Route path="main" element={<Organizer organizerId={organizerId} />} />
          <Route path="clubs" element={<OrganizerClubs organizerId={organizerId} />} />
          <Route path="bots" element={<OrganizerBots organizerId={organizerId} />} />

          {/* Управление Сериями заездов */}
          <Route path="series" element={<OrganizerSeriesLayout />}>
            <Route path="list" element={<OrganizerSeriesList organizerId={organizerId} />} />
            <Route
              path="create"
              element={<OrganizerSeriesCreate organizerId={organizerId} />}
            />
            <Route path="edit" element={<OrganizerSeriesEdit organizerId={organizerId} />} />
          </Route>
        </Route>
      )}
    </>
  );
}
