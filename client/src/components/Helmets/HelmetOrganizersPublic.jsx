import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Организаторы заездов"
 */
export const HelmetOrganizersPublic = () => {
  const title = 'Организаторы гонок Zwift – Серии заездов, Туры, Коферайды';
  const canonical = `${serverFront}/organizers`;
  const description =
    'Найдите организаторов гонок Zwift! Индивидуальные и командные заезды, серии, туры, TT и коферайды. Выбирайте события и участвуйте в виртуальных заездах! 🚴‍♂️🔥';
  const image = `${serverFront}/images/open_graph/organizers.webp`;
  const recommendationsTag = 'organizers';

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="yandex_recommendations_tag" content={recommendationsTag} />
    </Helmet>
  );
};
