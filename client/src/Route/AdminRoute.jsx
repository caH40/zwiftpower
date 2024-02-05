import { Route } from 'react-router-dom';
import { lazy } from 'react';

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
      <Route path="/zwift/event/edit" element={<ZwiftEditEvent />} />
      <Route path="/zwift/event/edit/:id" element={<ZwiftEditEvent />} />
      <Route path="/zwift/event/add" element={<ZwiftAddEvent />} />
      <Route path="/zwift/event/create" element={<ZwiftCreateEvent />} />
      <Route path="/admin/results/edit/:eventId" element={<EditResults />} />
      {isAdmin && <Route path="/admin/users" element={<Users />} />}
      {isAdmin && <Route path="/logs/admin" element={<LogsAdmin />} />}
      {isAdmin && <Route path="/logs/errors" element={<LogsErrors />} />}
      {isAdmin && <Route path="/logs/errors/:id" element={<LogErrorDescription />} />}
      {isAdmin && <Route path="admin/clubs" element={<ZwiftClubs />} />}
    </>
  );
}
