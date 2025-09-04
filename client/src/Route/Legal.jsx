import { Route } from 'react-router-dom';
import { lazy } from 'react';

const PrivacyPolicy = lazy(() => import('../Pages/Legal/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('../Pages/Legal/TermsOfUse'));
const Offer = lazy(() => import('../Pages/Legal/Offer'));

/**
 * Маршруты для документов Политики конфиденциальности и Пользовательского соглашения.
 */
export function LegalRoute() {
  return (
    <>
      <Route path="legal/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="legal/terms-of-use" element={<TermsOfUse />} />
      <Route path="legal/offer" element={<Offer />} />
    </>
  );
}
