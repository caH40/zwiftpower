import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Организатор заездов"
 */
export const HelmetOrganizerPublic = ({ urlSlug, name, imageSrc, pageType = 'schedule' }) => {
  const baseTitle = `${name} в Zwift 🚴`;
  const baseDescription = `${name} организует виртуальные гонки в Zwift: одиночные заезды, командные гонки, TT, коферайды и туры. Присоединяйтесь к заездам и улучшайте результаты!`;

  const pageTextMap = {
    schedule: 'Расписание заездов',
    series: 'Серии и туры',
  };

  const title = `${pageTextMap[pageType]} от ${baseTitle}`;
  const description = `${baseDescription} 📅 ${pageTextMap[pageType]} доступны на этой странице.`;
  const canonical = `${serverFront}/organizers/${urlSlug}/${pageType}`;
  const image = imageSrc;
  const recommendationsTag = 'organizer';

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
