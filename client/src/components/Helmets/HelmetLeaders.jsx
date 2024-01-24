import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Рейтинг райдеров по мощности"
 * @param {{female | male}} gender пол участников таблицы
 */
export const HelmetLeaders = ({ gender }) => {
  const genderStr = gender === 'female' ? 'женщин' : 'мужчин';
  const imageNumber = gender === 'female' ? '8' : '9';

  const title = `Рейтинг райдеров ${genderStr} по мощности в Zwift (Звифт)`;
  const canonical = `${serverFront}/race/statistics/leaders/${gender}`;
  const description = `Лидеры по абсолютным и удельным ваттам среди ${genderStr} за последние 90 дней. Интервалы 15 секунд, минута, 5 минут и 20 минут.`;
  const image = `https://zwiftpower.ru/images/open_graph/${imageNumber}.jpg`;
  const recommendationsTag = 'leaders';

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
