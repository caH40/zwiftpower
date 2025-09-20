import { Route } from 'react-router-dom';
import { lazy } from 'react';

const DocumentsPage = lazy(() => import('../Pages/Documents/Documents'));
const DevelopmentDocumentsPage = lazy(() =>
  import('../Pages/Documents/Development/DevelopmentDocuments')
);
const DevelopmentDocument = lazy(() =>
  import('../Pages/Documents/Development/DevelopmentDocument')
);
const PublicDocumentsPage = lazy(() => import('../Pages/Documents/Public/PublicDocuments'));
const PublicDocumentPage = lazy(() => import('../Pages/Documents/Public/PublicDocument'));
const OrganizerDocumentsPage = lazy(() =>
  import('../Pages/Documents/Organizer/OrganizerDocuments')
);
const OrganizerDocumentPage = lazy(() =>
  import('../Pages/Documents/Organizer/OrganizerDocument')
);

// UnderConstruction

export function DocumentsRoute() {
  return (
    <>
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/documents/development" element={<DevelopmentDocumentsPage />} />
      <Route path="/documents/development/:urlSlug" element={<DevelopmentDocument />} />
      <Route path="/documents/public" element={<PublicDocumentsPage />} />
      <Route path="/documents/public/:urlSlug" element={<PublicDocumentPage />} />
      <Route path="/documents/organizer" element={<OrganizerDocumentsPage />} />
      <Route path="/documents/organizer/:urlSlug" element={<OrganizerDocumentPage />} />
    </>
  );
}
