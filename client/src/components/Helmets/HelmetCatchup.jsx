import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Догонялки (CatchUp)"
 */
export const HelmetCatchup = ({ season }) => {
  const title = `Серия заездов Догонялки (CatchUp). Сезон ${season}`;
  const canonical = `${serverFront}/race/series/catchup/${season}`;
  const description = `Серия заездов Догонялки (CatchUp), проводимых командой KOM-on. Общий зачет за сезон ${season}. Список всех победителей заездов за сезон ${season}.`;
  const image = 'https://zwiftpower.ru/images/open_graph/2.jpg';
  const recommendationsTag = 'catchup';

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
