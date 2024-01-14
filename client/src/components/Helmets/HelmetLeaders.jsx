import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы Статистика лидеры мощности
 * @param {{female | male}} gender пол участников таблицы
 */
export const HelmetLeaders = ({ gender }) => {
  const genderStr = gender === 'female' ? 'женщин' : 'мужчин';
  const image = gender === 'female' ? '8' : '9';
  return (
    <Helmet>
      <link rel="canonical" href={`${serverFront}/race/statistics/leaders/${gender}`} />
      <title>{`Рейтинг райдеров ${genderStr} по мощности в Zwift (Звифт)`}</title>
      <meta
        name="description"
        content={`Лидеры по абсолютным и удельным ваттам среди ${genderStr} за последние 90 дней. 
        Интервалы 15 секунд, минута, 5 минут и 20 минут.`}
      />
      <meta
        property="og:title"
        content={`Рейтинг райдеров ${genderStr} по мощности в Zwift (Звифт)`}
      />
      <meta property="og:url" content={`${serverFront}/race/statistics/leaders/${gender}`} />
      <meta
        property="og:description"
        content={`Лидеры по абсолютным и удельным ваттам среди ${genderStr} за последние 90 дней. 
        Интервалы 15 секунд, минута, 5 минут и 20 минут.`}
      />
      <meta
        property="og:image"
        content={`https://zwiftpower.ru/images/open_graph/${image}.jpg`}
      />
    </Helmet>
  );
};
