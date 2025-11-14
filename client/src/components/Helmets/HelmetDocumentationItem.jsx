import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Документ документации"
 */
export const HelmetDocumentationItem = ({ contentTitle, type, url }) => {
  const canonical = `${serverFront}${url}`;

  const typeObj = {
    organizer: 'Организатора',
    development: 'Разработчика',
    public: 'Пользователя',
  };

  const typeLabels = {
    organizer: 'для организаторов',
    development: 'для разработчиков',
    public: 'для пользователей',
  };

  const titleRaw = `${contentTitle} - Документация ${typeObj[type]}: "${contentTitle}"`;

  // Шаблонная строка для description
  const descriptionRaw = `Изучите руководство "${contentTitle}" из документации ${typeLabels[type]}. Подробное описание, инструкции и примеры для эффективного использования.`;

  // Запрещены двойные кавычки в мета тегах.
  const description = descriptionRaw.replace(/"/g, '');
  const title = titleRaw.replace(/"/g, '');

  const recommendationsTag = 'documentation';
  const imageUrl = 'http://zwiftpower.ru/images/open_graph/documentation.jpg';
  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="yandex_recommendations_tag" content={recommendationsTag} />
    </Helmet>
  );
};
