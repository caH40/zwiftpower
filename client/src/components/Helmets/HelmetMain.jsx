import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Домашняя"
 */
export const HelmetMain = () => {
  const title = 'Анонсы ближайших заездов российского сообщества в Zwift (Звифт)';
  const canonical = serverFront;
  const description =
    'Анонсы ближайших заездов в виртуальном мире Zwift (Звифт) на велотренажерах.';
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
