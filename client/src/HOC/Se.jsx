import { Suspense, useEffect } from 'react';

function MySuspense({ children }) {
  // добавить спинер или найти возможность перевести отображение Z-спинера
  return <Suspense>{children}</Suspense>;
}

export default MySuspense;
