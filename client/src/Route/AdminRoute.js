import { Route } from 'react-router-dom';
import { lazy } from 'react';

const EventCreate = lazy(() => import('../Pages/EventCreate/EventCreate'));
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
      <Route path="/zwift/create/event" element={<EventCreate />} />
      <Route path="/bot" element={<Bot />} />
      <Route path="/edit/upload" element={<Upload />} />
      <Route path="/edit/riders" element={<Riders />} />
      <Route path="/edit/users" element={<EditUsers />} />
      <Route path="/edit/series" element={<EditSeriesMain />} />
      <Route path="/edit/series/add" element={<AddSeries />} />
      <Route path="/edit/series/:seriesId" element={<EditSeries />} />
      <Route path="/edit/series/:seriesId/stage-add" element={<AddStage />} />
      <Route path="/edit/series/:seriesId/stage-edit/:stageId" element={<EditStageParams />} />
      <Route path="/edit/stage" element={<EditSeriesList />} />
      <Route path="/edit/stage/:seriesId" element={<EditStageList />} />
      <Route path="/edit/stage/:seriesId/:stageId" element={<EditResults />} />
      <Route path="/edit/stage/:stageId/rider-add" element={<AddRider />} />
    </>
  );
}
