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
const UserModeration = lazy(() => import('../Pages/UserModeration/UserModeration'));
const RiderModerationActivities = lazy(() =>
  import('../Pages/RiderModerationActivities/RiderModerationActivities')
);
const UserModerationMain = lazy(() => import('../Pages/UserModerationMain/UserModerationMain'));
const RiderModerationMain = lazy(() =>
  import('../Pages/RiderModerationMain/RiderModerationMain')
);
const RiderModerationBanList = lazy(() =>
  import('../Pages/RiderModerationBanList/RiderModerationBanList')
);
const RiderModerationLayout = lazy(() =>
  import('../Pages/RiderModerationLayout/RiderModerationLayout')
);
const ZwiftClubs = lazy(() => import('../Pages/ZwiftClubs/ZwiftClubs'));
const ZwiftViewEvent = lazy(() => import('../Pages/ZwiftViewEvent/ZwiftViewEvent'));
const AdminNotifications = lazy(() => import('../Pages/AdminNotifications/AdminNotifications'));

export function AdminRoute(isAdmin) {
  return (
    <>
      <Route path="/bot" element={<Bot />} />
      <Route path="/zwift" element={<Moderator />}>
        <Route path="event/edit" element={<ZwiftEditEvent />} />
        <Route path="event/edit/:id" element={<ZwiftEditEvent />} />
        <Route path="event/add" element={<ZwiftAddEvent />} />
        <Route path="event/create" element={<ZwiftCreateEvent />} />
        <Route path="event/view" element={<ZwiftViewEvent />} />
      </Route>

      {isAdmin && (
        <Route path={'/admin'} element={<Admin />}>
          <Route path="users" element={<Users />} />

          <Route path="users/:_id" element={<UserModeration />}>
            <Route path="main" element={<UserModerationMain />} />
          </Route>

          <Route path="riders/:zwiftId" element={<RiderModerationLayout />}>
            <Route path="activities" element={<RiderModerationActivities />} />
            <Route path="main" element={<RiderModerationMain />} />
            <Route path="bans" element={<RiderModerationBanList />} />
          </Route>

          <Route path="logs/admin" element={<LogsAdmin />} />
          <Route path="logs/errors" element={<LogsErrors />} />
          <Route path="organizer" element={<AdminOrganizer />} />
          <Route path="logs/errors/:id" element={<LogErrorDescription />} />
          <Route path="clubs" element={<ZwiftClubs />} />
          <Route path="notifications" element={<AdminNotifications />} />
        </Route>
      )}
      <Route path="/admin/results/edit/:eventId" element={<EditResults />} />
    </>
  );
}
