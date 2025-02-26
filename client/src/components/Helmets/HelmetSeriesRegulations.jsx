import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование метатегов для страницы "Регламент серии заездов"
 * description передается данные из переменной mission из объекта series
 */
export const HelmetSeriesRegulations = ({
  urlSlug,
  name,
  dateStart,
  dateEnd,
  organizer,
  description,
  imageSrc,
}) => {
  // Формирование заголовка
  const title = `Регламент: ${name} с ${dateStart} по ${dateEnd}, проводимых в Звифте. Организатор: ${organizer}`;

  // Формирование описания
  const descriptionCurrent =
    `${description} Узнайте правила, призы и другую важную информацию!` ||
    `Ознакомьтесь с регламентом "${name}" (${dateStart}-${dateEnd}). Организатор: ${organizer}. Узнайте правила, призы и другую важную информацию!`;

  // Канонический URL
  const canonical = `${serverFront}/series/${urlSlug}/regulations`;

  // Изображение
  const image = imageSrc;

  // Тег для рекомендаций
  const recommendationsTag = 'organizer';

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={descriptionCurrent} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={descriptionCurrent} />
      <meta property="og:image" content={image} />
      <meta property="yandex_recommendations_tag" content={recommendationsTag} />
    </Helmet>
  );
};
