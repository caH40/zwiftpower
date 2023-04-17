import { Route } from 'react-router-dom';
import { lazy } from 'react';

import MySuspense from '../HOC/Se';

const ZwiftEditEvent = lazy(() => import('../Pages/ZwiftEditEvent/ZwiftEditEvent'));
const Bot = lazy(() => import('../Pages/Bot/Bot'));
const Upload = lazy(() => import('../Pages/Upload/Upload'));
const Riders = lazy(() => import('../Pages/Riders/Riders'));
const EditUsers = lazy(() => import('../Pages/EditUsers'));
const EditSeriesMain = lazy(() => import('../Pages/Edit/EditSeriesMain'));
const AddSeries = lazy(() => import('../Pages/Edit/AddSeries'));
const EditSeries = lazy(() => import('../Pages/Edit/EditSeries'));
const AddStage = lazy(() => import('../Pages/Edit/AddStage'));
const EditStageParams = lazy(() => import('../Pages/Edit/EditStageParams'));
const EditSeriesList = lazy(() => import('../Pages/EditSeriesList'));
const EditStageList = lazy(() => import('../Pages/Edit/EditStageList'));
const EditResults = lazy(() => import('../Pages/EditResults/EditResults'));
const AddRider = lazy(() => import('../Pages/AddRider/AddRider'));

export function AdminRoute() {
  return (
    <>
      <Route
        path="/zwift/edit/event"
        element={
          <MySuspense>
            <ZwiftEditEvent />
          </MySuspense>
        }
      />
      <Route
        path="/bot"
        element={
          <MySuspense>
            <Bot />
          </MySuspense>
        }
      />
      <Route
        path="/edit/upload"
        element={
          <MySuspense>
            <Upload />
          </MySuspense>
        }
      />
      <Route
        path="/edit/riders"
        element={
          <MySuspense>
            <Riders />
          </MySuspense>
        }
      />
      <Route
        path="/edit/users"
        element={
          <MySuspense>
            <EditUsers />
          </MySuspense>
        }
      />
      <Route
        path="/edit/series"
        element={
          <MySuspense>
            <EditSeriesMain />
          </MySuspense>
        }
      />
      <Route
        path="/edit/series/add"
        element={
          <MySuspense>
            <AddSeries />
          </MySuspense>
        }
      />
      <Route
        path="/edit/series/:seriesId"
        element={
          <MySuspense>
            <EditSeries />
          </MySuspense>
        }
      />
      <Route
        path="/edit/series/:seriesId/stage-add"
        element={
          <MySuspense>
            <AddStage />
          </MySuspense>
        }
      />
      <Route
        path="/edit/series/:seriesId/stage-edit/:stageId"
        element={
          <MySuspense>
            <EditStageParams />
          </MySuspense>
        }
      />
      <Route
        path="/edit/stage"
        element={
          <MySuspense>
            <EditSeriesList />
          </MySuspense>
        }
      />
      <Route
        path="/edit/stage/:seriesId"
        element={
          <MySuspense>
            <EditStageList />
          </MySuspense>
        }
      />
      <Route
        path="/edit/stage/:seriesId/:stageId"
        element={
          <MySuspense>
            <EditResults />
          </MySuspense>
        }
      />
      <Route
        path="/edit/stage/:stageId/rider-add"
        element={
          <MySuspense>
            <AddRider />
          </MySuspense>
        }
      />
    </>
  );
}
