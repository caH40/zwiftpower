import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы "Серии и Туры заездов"
 */
export const HelmetSeries = () => {
  const title = 'Серии и Туры заездов российского сообществом в Zwift (Звифт)';
  const canonical = `${serverFront}/race/series`;
  const description =
    'Серии и Туры заездов в виртуальном мире Zwift (Звифт) на велотренажерах.';
  const image = 'https://zwiftpower.ru/images/main.jpg';
  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};
