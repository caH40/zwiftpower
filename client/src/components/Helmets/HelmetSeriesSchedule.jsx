import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Серия заездов расписание Этапов"
 * description передается данные из переменной mission из объекта series
 */
export const HelmetSeriesSchedule = ({
  urlSlug,
  name,
  dateStart,
  dateEnd,
  organizer,
  description,
  imageSrc,
}) => {
  const title = `Расписание этапов: ${name} с ${dateStart} по ${dateEnd}, проводимых в Звифте. Организатор: ${organizer}`;
  const canonical = `${serverFront}/series/${urlSlug}/schedule`;
  const descriptionCurrent =
    `${description} Следите за результатами!` ||
    `Следите за этапами "${name}" (${dateStart}-${dateEnd}). Организатор: ${organizer}. Присоединяйтесь к соревнованиям и следите за результатами!`;
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
