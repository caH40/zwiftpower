import { Route } from 'react-router-dom';
import { lazy } from 'react';

import CallbackVKID from '../Pages/Auth/Callback/CallbackVKID';
import CallbackYandexID from '../Pages/Auth/Callback/CallbackYandexID';

const Authorization = lazy(() => import('../Pages/Auth/Authorization'));
const Registration = lazy(() => import('../Pages/Auth/Registration'));
const ResetPassword = lazy(() => import('../Pages/Auth/ResetPassword'));
const ConfirmEmail = lazy(() => import('../Pages/ConfirmEmail/ConfirmEmail'));
const NewPassword = lazy(() => import('../Pages/Auth/NewPassword'));

export function AuthRoute() {
  return (
    <>
      <Route path="/auth/authorization" element={<Authorization />} />
      <Route path="/auth/registration" element={<Registration />} />
      <Route path="/auth/reset" element={<ResetPassword />} />
      <Route path="/auth/confirm-email/:token" element={<ConfirmEmail />} />
      <Route path="/auth/new-password/:token" element={<NewPassword />} />
      <Route path="/api/auth/callback/vk" element={<CallbackVKID />} />
      <Route path="/api/auth/callback/yandex" element={<CallbackYandexID />} />
    </>
  );
}
