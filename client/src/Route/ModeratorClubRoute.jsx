import { Route } from 'react-router-dom';
import { lazy } from 'react';

const Moderator = lazy(() => import('../Pages/Moderator/Moderator'));
const ZwiftCreateEvent = lazy(() => import('../Pages/ZwiftCreateEvent/ZwiftCreateEvent'));
const ZwiftEditEvent = lazy(() => import('../Pages/ZwiftEditEvent/ZwiftEditEvent'));
const ZwiftAddEvent = lazy(() => import('../Pages/ZwiftAddEvent/ZwiftAddEvent'));
const ZwiftViewEvent = lazy(() => import('../Pages/ZwiftViewEvent/ZwiftViewEvent'));
const EditResults = lazy(() => import('../Pages/EditResults/EditResults'));

/**
 * Маршруты для модератора клубов. Пользователь у которого есть хотя бы один клуб для модерации.
 * Пользователь назначается модератором клуба любым Организатором.
 */
export function ModeratorClubRoute() {
  return (
    <>
      <Route path="/zwift" element={<Moderator />}>
        <Route path="event/edit" element={<ZwiftEditEvent />} />
        <Route path="event/edit/:id" element={<ZwiftEditEvent />} />
        <Route path="event/add" element={<ZwiftAddEvent />} />
        <Route path="event/create" element={<ZwiftCreateEvent />} />
        <Route path="event/view" element={<ZwiftViewEvent />} />
      </Route>
      <Route path="/results/edit/:eventId" element={<EditResults />} />
    </>
  );
}
