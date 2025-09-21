import { Navigate, Route } from 'react-router-dom';
import { lazy } from 'react';
import { useSelector } from 'react-redux';

import { LoadingPage } from '../Pages/LoadingPage/LoadingPage';

const Documentation = lazy(() => import('../Pages/Documentation/Documentation'));
const DevelopmentDocumentationList = lazy(() =>
  import('../Pages/Documentation/Development/DevelopmentDocumentationList')
);
const DevelopmentDocumentation = lazy(() =>
  import('../Pages/Documentation/Development/DevelopmentDocumentation')
);
const PublicDocumentationList = lazy(() =>
  import('../Pages/Documentation/Public/PublicDocumentationList')
);
const PublicDocumentation = lazy(() =>
  import('../Pages/Documentation/Public/PublicDocumentation')
);
const OrganizerDocumentationList = lazy(() =>
  import('../Pages/Documentation/Organizer/OrganizerDocumentationList')
);
const OrganizerDocumentation = lazy(() =>
  import('../Pages/Documentation/Organizer/OrganizerDocumentation')
);
const Faq = lazy(() => import('../Pages/Faq/Faq'));

export function DocumentationRoute({ isOrganizer, isAdmin }) {
  const { status } = useSelector((state) => state.checkAuth);

  if (status === 'loading' || status === 'idle') {
    return <Route path="*" element={<LoadingPage />} />;
  }

  return (
    <>
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/documentation/faq" element={<Faq />} />
      <Route path="/documentation/public" element={<PublicDocumentationList />} />
      <Route path="/documentation/public/:urlSlug" element={<PublicDocumentation />} />
      {isOrganizer || isAdmin ? (
        <>
          <Route
            path="/documentation/organizer/:urlSlug"
            element={<OrganizerDocumentation />}
          />
          <Route path="/documentation/organizer" element={<OrganizerDocumentationList />} />
        </>
      ) : (
        <Route path="/documentation/organizer" element={<Navigate to="/403" replace />} />
      )}

      {isAdmin ? (
        <>
          <Route path="/documentation/development" element={<DevelopmentDocumentationList />} />
          <Route
            path="/documentation/development/:urlSlug"
            element={<DevelopmentDocumentation />}
          />
        </>
      ) : (
        <Route path="/documentation/development" element={<Navigate to="/403" replace />} />
      )}
    </>
  );
}
