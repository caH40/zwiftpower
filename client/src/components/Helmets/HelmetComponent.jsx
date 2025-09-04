import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Универсальный компонент для формирования Мета-тегов.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.title - Заголовок страницы (title).
 * @param {string} props.canonical - Канонический URL. По умолчанию - serverFront.
 * @param {string} props.description - Meta-описание (description).
 * @param {string} props.image - URL изображения для Open Graph. По умолчанию - главное изображение.
 * @param {string} [props.recommendationsTag] - Тег для Яндекс.Рекомендаций.
 * @param {boolean} props.noindex - Флаг для запрета индексации. По умолчанию false.
 */
export const HelmetComponent = ({
  title = 'Анонсы ближайших заездов российского сообщества в Zwift (Звифт)',
  canonical = serverFront,
  description = 'Анонсы ближайших заездов в виртуальном мире Zwift (Звифт) на велотренажерах.',
  image = 'https://zwiftpower.ru/images/main.jpg',
  noindex = false,
  recommendationsTag,
}) => {
  return (
    <Helmet>
      {/* Блокировка индексации */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {recommendationsTag && (
        <meta property="yandex_recommendations_tag" content={recommendationsTag} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
