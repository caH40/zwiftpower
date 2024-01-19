import { serverFront } from '../config/environment.js';
import { MetaTags } from '../types/types.interface.js';

/**
 * Формирование Мета тегов для страницы "Домашняя"
 */
export const getHomeMeta = (): MetaTags => {
  const title = 'Анонсы ближайших заездов российского сообщества в Zwift (Звифт)';
  const canonical = serverFront;
  const description =
    'Анонсы ближайших заездов в виртуальном мире Zwift (Звифт) на велотренажерах.';
  const image = 'https://zwiftpower.ru/images/main.jpg';

  return { title, canonical, description, image };
};

/**
 * Формирование Мета тегов для страницы "Расписание заездов"
 */
export const getScheduleListMeta = (url: string): MetaTags => {
  const title = 'Расписание заездов российского сообщества в Zwift (Звифт)';
  const canonical = serverFront + url;
  const description =
    'Расписание групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах.';
  const image = 'https://zwiftpower.ru/images/main.jpg';

  return { title, canonical, description, image };
};

/**
 * Формирование Мета тегов для страницы "Результаты заездов"
 */
export const getResultListMeta = (url: string): MetaTags => {
  const title = 'Результаты заездов российского сообщества в Zwift (Звифт)';
  const canonical = serverFront + url;
  const description =
    'Результаты групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах.';
  const image = 'https://zwiftpower.ru/images/main.jpg';

  return { title, canonical, description, image };
};

/**
 * Формирование Мета тегов для страницы "Серии и Туры заездов"
 */
export const getSeriesMeta = (url: string): MetaTags => {
  const title = 'Серии и Туры заездов российского сообществом в Zwift (Звифт)';
  const canonical = serverFront + url;
  const description =
    'Серии и Туры заездов в виртуальном мире Zwift (Звифт) на велотренажерах.';
  const image = 'https://zwiftpower.ru/images/main.jpg';

  return { title, canonical, description, image };
};

/**
 * Формирование Мета тегов для страницы "Статистика"
 */
export const getStatisticsMeta = (url: string): MetaTags => {
  const title = 'Статистика по райдерам и Эвентам в Zwift (Звифт)';
  const canonical = serverFront + url;
  const description =
    'Общая статистика российского сообщества в Zwift (Звифт). Диаграммы по количеству участников в гонках, по возрастным категориям, по типам заездов.';
  const image = 'https://zwiftpower.ru/images/open_graph/5.jpg';

  return { title, canonical, description, image };
};

/**
 * Формирование Мета тегов для страницы "Рейтинг райдеров по мощности"
 */
export const getLeadersMeta = (url: string): MetaTags => {
  const gender = url.replace('/race/statistics/leaders/', '');
  const genderStr = gender === 'female' ? 'женщин' : 'мужчин';
  const imageNumber = gender === 'female' ? '8' : '9';

  const title = `Рейтинг райдеров ${genderStr} по мощности в Zwift (Звифт)`;
  const canonical = serverFront + url;
  const description = `Лидеры по абсолютным и удельным ваттам среди ${genderStr} за последние 90 дней. Интервалы 15 секунд, минута, 5 минут и 20 минут.`;
  const image = `https://zwiftpower.ru/images/open_graph/${imageNumber}.jpg`;

  return { title, canonical, description, image };
};

/**
 * Формирование Мета тегов для страницы "Статистика райдеров по FTP"
 */
export const getFTPMeta = (url: string): MetaTags => {
  const title = 'Статистика райдеров по FTP в Zwift (Звифт)';
  const canonical = serverFront + url;
  const description =
    'Диаграммы распределения райдеров по FTP (Functional Threshold Power). Диаграммы распределения райдеров по категориям (группам).';
  const image = 'https://zwiftpower.ru/images/open_graph/3.jpg';

  return { title, canonical, description, image };
};

/**
 * Формирование Мета тегов для страницы "Догонялки (CatchUp)"
 */
export const getCatchupMeta = (url: string): MetaTags => {
  const season = url.replace('/race/series/catchup/', '');
  const title = `Серия заездов Догонялки (CatchUp). Сезон ${season}`;
  const canonical = serverFront + url;
  const description = `Серия заездов Догонялки (CatchUp), проводимых командой KOM-on. Общий зачет за сезон ${season}. Список всех победителей заездов за сезон ${season}.`;
  const image = 'https://zwiftpower.ru/images/open_graph/2.jpg';

  return { title, canonical, description, image };
};

/**
 * Формирование Мета тегов для страниц, не учтенных в данном обработчике"
 */
export const getMetaOtherPages = (url: string): MetaTags => {
  const title = 'Ride On';
  const canonical = serverFront + url;
  const description =
    'Анонсы, расписание, результаты заездов российского сообщества в Zwift (Звифт).';
  const image = 'https://zwiftpower.ru/images/main.jpg';

  return { title, canonical, description, image };
};
