import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы Результаты
 */
export const HelmetResults = () => {
  return (
    <Helmet>
      <link rel="canonical" href={`${serverFront}/race/results`} />
      <title>Результаты заездов российского сообщества в Zwift (Звифт)</title>
      <meta
        name="description"
        content="Результаты групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах."
      />
      <meta
        property="og:title"
        content="Результаты заездов российского сообщества в Zwift (Звифт)"
      />
      <meta property="og:url" content={`${serverFront}/race/results`} />
      <meta
        property="og:description"
        content="Результаты групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах."
      />
      <meta property="og:image" content="https://zwiftpower.ru/images/main.jpg" />
    </Helmet>
  );
};
