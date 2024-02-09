import { Route } from 'react-router-dom';
import { lazy } from 'react';

const AdminOrganizer = lazy(() => import('../Pages/AdminOrganizer/AdminOrganizer'));
const Admin = lazy(() => import('../Pages/Admin/Admin'));
const Moderator = lazy(() => import('../Pages/Moderator/Moderator'));
const ZwiftCreateEvent = lazy(() => import('../Pages/ZwiftCreateEvent/ZwiftCreateEvent'));
const LogsAdmin = lazy(() => import('../Pages/LogsAdmin/LogsAdmin'));
const LogsErrors = lazy(() => import('../Pages/LogsErrors/LogsErrors'));
const LogErrorDescription = lazy(() =>
  import('../Pages/LogErrorDescription/LogErrorDescription')
);
const ZwiftEditEvent = lazy(() => import('../Pages/ZwiftEditEvent/ZwiftEditEvent'));
const Bot = lazy(() => import('../Pages/Bot/Bot'));
const ZwiftAddEvent = lazy(() => import('../Pages/ZwiftAddEvent/ZwiftAddEvent'));
const EditResults = lazy(() => import('../Pages/EditResults/EditResults'));
const Users = lazy(() => import('../Pages/Users/Users'));
const ZwiftClubs = lazy(() => import('../Pages/ZwiftClubs/ZwiftClubs'));

export function AdminRoute(isAdmin) {
  return (
    <>
      <Route path="/bot" element={<Bot />} />
      <Route path="/zwift" element={<Moderator />}>
        <Route path="event/edit" element={<ZwiftEditEvent />} />
        <Route path="event/edit/:id" element={<ZwiftEditEvent />} />
        <Route path="event/add" element={<ZwiftAddEvent />} />
        <Route path="event/create" element={<ZwiftCreateEvent />} />
      </Route>

      {isAdmin && (
        <Route path={'/admin'} element={<Admin />}>
          <Route path="users" element={<Users />} />
          <Route path="logs/admin" element={<LogsAdmin />} />
          <Route path="logs/errors" element={<LogsErrors />} />
          <Route path="organizer" element={<AdminOrganizer />} />
          <Route path="logs/errors/:id" element={<LogErrorDescription />} />
          <Route path="clubs" element={<ZwiftClubs />} />
        </Route>
      )}
      <Route path="/admin/results/edit/:eventId" element={<EditResults />} />
    </>
  );
}
