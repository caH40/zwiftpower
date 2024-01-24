import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Часто задаваемые вопрос"
 */
export const HelmetFaq = () => {
  const title = 'Frequently Asked Questions';
  const canonical = `${serverFront}/faq`;
  const description =
    'Часто задаваемые вопросы (FAQ). Описание иконок, категорий, поиск джерси из Звифта по названию.';
  const image = 'https://zwiftpower.ru/images/open_graph/4.jpg';
  const recommendationsTag = 'faq';
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
