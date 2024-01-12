import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы "Серии и Туры заездов"
 */
export const HelmetSeries = () => {
  return (
    <Helmet>
      <link rel="canonical" href={`${serverFront}/race/series`} />
      <title>Серии и Туры заездов, проводимых российским сообществом в Zwift (Звифт)</title>
      <meta
        name="description"
        content="Серии и Туры заездов в виртуальном мире Zwift (Звифт) на велотренажерах."
      />
      <meta
        property="og:title"
        content="Серии и Туры заездов, проводимых российским сообществом в Zwift (Звифт)"
      />
      <meta property="og:url" content={`${serverFront}/race/series`} />
      <meta
        property="og:description"
        content="Серии и Туры заездов в виртуальном мире Zwift (Звифт) на велотренажерах."
      />
    </Helmet>
  );
};
