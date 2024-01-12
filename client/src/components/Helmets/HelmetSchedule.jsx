import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы Расписание
 */
export const HelmetSchedule = () => {
  return (
    <Helmet>
      <link rel="canonical" href={`${serverFront}/race/schedule`} />
      <title>Расписание заездов российского сообщества в Zwift (Звифт)</title>
      <meta
        name="description"
        content="Расписание групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах."
      />
      <meta
        property="og:title"
        content="Расписание заездов российского сообщества в Zwift (Звифт)"
      />
      <meta property="og:url" content={`${serverFront}/race/schedule`} />
      <meta
        property="og:description"
        content="Расписание групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах."
      />
      <meta property="og:image" content="https://zwiftpower.ru/images/main.jpg" />
    </Helmet>
  );
};
