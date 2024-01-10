import { Helmet } from 'react-helmet-async';

/**
 * Для страницы Результаты
 */
export const HelmetResults = () => {
  return (
    <Helmet>
      <link rel="canonical" href="https://zwiftpower.ru/race/results" />
      <title>Ride On! Результаты заездов российского сообщества в Zwift (Звифт)</title>
      <meta
        name="description"
        content="Результаты групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах."
      />
      <meta
        property="og:title"
        content="Результаты заездов российского сообщества в Zwift (Звифт)"
      />
      <meta property="og:url" content="https://zwiftpower.ru/race/results" />
      <meta
        property="og:description"
        content="Результаты заездов российского сообщества в Zwift (Звифт). Результаты групповых заездов, соревнований на велотренажерах в виртуальном мире Звифт."
      />
    </Helmet>
  );
};
