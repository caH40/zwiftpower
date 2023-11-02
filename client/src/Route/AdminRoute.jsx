import { Route } from 'react-router-dom';
import { lazy } from 'react';

import MySuspense from '../HOC/Se';

const ZwiftEditEvent = lazy(() => import('../Pages/ZwiftEditEvent/ZwiftEditEvent'));
const Bot = lazy(() => import('../Pages/Bot/Bot'));
const ZwiftAddEvent = lazy(() => import('../Pages/ZwiftAddEvent/ZwiftAddEvent'));
const EditResults = lazy(() => import('../Pages/EditResults/EditResults'));

export function AdminRoute() {
  return (
    <>
      <Route
        path="/bot"
        element={
          <MySuspense>
            <Bot />
          </MySuspense>
        }
      />
      <Route
        path="/zwift/edit/event"
        element={
          <MySuspense>
            <ZwiftEditEvent />
          </MySuspense>
        }
      />
      <Route
        path="/zwift/edit/event/:id"
        element={
          <MySuspense>
            <ZwiftEditEvent />
          </MySuspense>
        }
      />
      <Route
        path="/zwift/add/event"
        element={
          <MySuspense>
            <ZwiftAddEvent />
          </MySuspense>
        }
      />
      <Route
        path="/admin/results/edit/:eventId"
        element={
          <MySuspense>
            <EditResults />
          </MySuspense>
        }
      />
    </>
  );
}
