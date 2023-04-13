import React, { Suspense } from 'react';

function MySuspense({ children }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}

export default MySuspense;
