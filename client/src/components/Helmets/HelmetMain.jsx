import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы Главная (домашняя)
 */
export const HelmetMain = () => {
  return (
    <Helmet>
      <link rel="canonical" href={`${serverFront}`} />
      <title>Анонсы ближайших заездов российского сообщества в Zwift (Звифт)</title>
      <meta
        name="description"
        content="Анонсы ближайших заездов в виртуальном мире Zwift (Звифт) на велотренажерах."
      />
      <meta
        property="og:title"
        content="Анонсы ближайших заездов российского сообщества в Zwift (Звифт)"
      />
      <meta property="og:url" content={`${serverFront}`} />
      <meta
        property="og:description"
        content="Анонс ближайших заездов в виртуальном мире Zwift (Звифт) на велотренажерах."
      />
      <meta property="og:image" content="https://zwiftpower.ru/images/main.jpg" />
    </Helmet>
  );
};
