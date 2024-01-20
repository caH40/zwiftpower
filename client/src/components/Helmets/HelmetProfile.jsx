import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Результаты заезда"
 */
export const HelmetProfile = ({ profileId, firstName, lastName, image, page }) => {
  const rider = `${firstName} ${lastName}`;

  const titleRaw = page === 'results' ? `Результаты ${rider}` : `Диаграмма мощности ${rider}`;
  // запрещены двойные кавычки в мета тегах
  const title = titleRaw.replace(/"/g, '');
  const canonical = `${serverFront}/${profileId}/${page}`;

  // формирование описания
  const descriptionResults = `Профиль райдера ${rider}. Результаты заездов в Zwift (Звифт).`;
  const descriptionPower = `Кривая мощности за 90 дней ${rider}. Сравнение кривых мощности за разные заезды.`;
  const descriptionRaw = page === 'results' ? descriptionResults : descriptionPower;
  // запрещены двойные кавычки в мета тегах
  const description = descriptionRaw.replace(/"/g, '');

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
