import { Navigate, Route } from 'react-router-dom';
import { lazy } from 'react';

import { navigateTo403 } from '../utils/routeUtils';

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
  return (
    <>
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/documentation/faq" element={<Faq />} />
      <Route path="/documentation/public" element={<PublicDocumentationList />} />
      <Route path="/documentation/public/:urlSlug" element={<PublicDocumentation />} />
      <Route path="/documentation/organizer/:urlSlug" element={<OrganizerDocumentation />} />
      <Route path="/documentation/organizer" element={<OrganizerDocumentationList />} />

      {isAdmin ? (
        <>
          <Route path="/documentation/development" element={<DevelopmentDocumentationList />} />
          <Route
            path="/documentation/development/:urlSlug"
            element={<DevelopmentDocumentation />}
          />
        </>
      ) : (
        navigateTo403('/documentation/development/*')
      )}
    </>
  );
}
