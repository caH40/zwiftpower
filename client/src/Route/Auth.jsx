import { Route } from 'react-router-dom';
import { lazy } from 'react';

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
    </>
  );
}
