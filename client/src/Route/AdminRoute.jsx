import { Route } from 'react-router-dom';
import { lazy } from 'react';

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

export function AdminRoute(isAdmin) {
  return (
    <>
      <Route path="/bot" element={<Bot />} />
      <Route path="/zwift/edit/event" element={<ZwiftEditEvent />} />
      <Route path="/zwift/edit/event/:id" element={<ZwiftEditEvent />} />
      <Route path="/zwift/add/event" element={<ZwiftAddEvent />} />
      <Route path="/admin/results/edit/:eventId" element={<EditResults />} />
      {isAdmin && <Route path="/admin/users" element={<Users />} />}
      {isAdmin && <Route path="/logs/admin" element={<LogsAdmin />} />}
      {isAdmin && <Route path="/logs/errors" element={<LogsErrors />} />}
      {isAdmin && <Route path="/logs/errors/:id" element={<LogErrorDescription />} />}
    </>
  );
}
