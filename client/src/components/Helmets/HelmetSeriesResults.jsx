import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Результаты Серии заездов"
 * description передается данные из переменной mission из объекта series
 */
export const HelmetSeriesResults = ({
  urlSlug,
  name,
  dateStart,
  dateEnd,
  organizer,
  description,
  imageSrc,
}) => {
  const title = `Результаты и генеральные зачеты: ${name} с ${dateStart} по ${dateEnd}, проводимых в Звифте. Организатор: ${organizer}`;
  const canonical = `${serverFront}/series/${urlSlug}/results`;
  const descriptionCurrent = description
    ? `${description} Итоговые таблицы серии`
    : `Следите за итоговыми результатами "${name}" (${dateStart}-${dateEnd}). Организатор: ${organizer}. Присоединяйтесь к соревнованиям!`;
  const image = imageSrc;
  const recommendationsTag = 'organizer';

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={descriptionCurrent} />
      <meta property="og:image" content={image} />
      <meta property="yandex_recommendations_tag" content={recommendationsTag} />
    </Helmet>
  );
};
