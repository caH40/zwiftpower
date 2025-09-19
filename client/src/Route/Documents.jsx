import { Route } from 'react-router-dom';
import { lazy } from 'react';

const DocumentsPage = lazy(() => import('../Pages/Documents/Documents'));
const DevelopmentDocumentsPage = lazy(() =>
  import('../Pages/Documents/Development/DevelopmentDocuments')
);
const DevelopmentDocument = lazy(() =>
  import('../Pages/Documents/Development/DevelopmentDocument')
);

// UnderConstruction

export function DocumentsRoute() {
  return (
    <>
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/documents/development" element={<DevelopmentDocumentsPage />} />
      <Route path="/documents/development/:urlSlug" element={<DevelopmentDocument />} />
    </>
  );
}
