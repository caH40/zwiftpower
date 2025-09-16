import { Navigate, Route } from 'react-router-dom';
import { lazy } from 'react';

const AdminOrganizer = lazy(() => import('../Pages/AdminOrganizer/AdminOrganizer'));
const Admin = lazy(() => import('../Pages/Admin/Admin'));
const LogsAdmin = lazy(() => import('../Pages/LogsAdmin/LogsAdmin'));
const LogsErrors = lazy(() => import('../Pages/LogsErrors/LogsErrors'));
const LogErrorDescription = lazy(() =>
  import('../Pages/LogErrorDescription/LogErrorDescription')
);
const Bot = lazy(() => import('../Pages/Bot/Bot'));

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
const AdminCreateEmail = lazy(() =>
  import('../Pages/AdminNotifications/AdminCreateEmail/AdminCreateEmail')
);
const AdminNotificationsLayout = lazy(() =>
  import('../Pages/AdminNotifications/AdminNotificationsLayout')
);
const EventsEmailPreviewPage = lazy(() =>
  import('../Pages/AdminNotifications/EventsEmailPreview/EventsEmailPreview')
);

const AdminOthersLayout = lazy(() => import('../Pages/AdminOthers/AdminOthersLayout'));
const AdminFinishProtocolLayout = lazy(() =>
  import('../Pages/AdminOthers/AdminFinishProtocol/AdminFinishProtocolLayout')
);
const AdminConfigFPCreate = lazy(() =>
  import('../Pages/AdminOthers/AdminFinishProtocol/Create/AdminFinishProtocolCreate')
);
const AdminConfigFPEdit = lazy(() =>
  import('../Pages/AdminOthers/AdminFinishProtocol/Edit/AdminFinishProtocolEdit')
);

export function AdminRoute(isAdmin) {
  return (
    <>
      <Route path="/bot" element={<Bot />} />

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

          <Route path="notifications" element={<AdminNotificationsLayout />}>
            <Route index element={<Navigate to="create-email" replace />} />
            <Route path="create-email" element={<AdminCreateEmail />} />
            <Route path="events-email-preview" element={<EventsEmailPreviewPage />} />
          </Route>

          <Route path="others" element={<AdminOthersLayout />}>
            <Route path="finish-protocol" element={<AdminFinishProtocolLayout />}>
              <Route path="create" element={<AdminConfigFPCreate />} />
              <Route path="edit" element={<AdminConfigFPEdit />} />
            </Route>
          </Route>
        </Route>
      )}
    </>
  );
}
