import { serverWoWWW } from '../config/environment.js';
import { MetaTags } from '../types/types.interface.js';

/**
 * Формирование Мета тегов для страницы "Домашняя"
 */
export const getHomeMeta = (): MetaTags => {
  const title = 'Анонсы ближайших заездов в Zwift (Звифт) российского сообщества';
  const canonical = serverWoWWW;
  const description =
    'Анонсы ближайших заездов в виртуальном мире Zwift (Звифт) на велотренажерах.';
  const image = 'https://zwiftpower.ru/images/main.jpg';
  const recommendationsTag = 'main';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Расписание заездов"
 */
export const getScheduleListMeta = (url: string): MetaTags => {
  const title = 'Расписание заездов в Zwift (Звифт) российского сообщества';
  const canonical = serverWoWWW + url;
  const description =
    'Расписание групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах.';
  const image = 'https://zwiftpower.ru/images/main.jpg';
  const recommendationsTag = 'schedule_list';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Результаты заездов"
 */
export const getResultListMeta = (url: string): MetaTags => {
  const title = 'Результаты заездов российского сообщества в Zwift (Звифт)';
  const canonical = serverWoWWW + url;
  const description =
    'Результаты групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах.';
  const image = 'https://zwiftpower.ru/images/main.jpg';
  const recommendationsTag = 'results_list';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Серии и Туры заездов"
 */
export const getSeriesMeta = (url: string): MetaTags => {
  const title = 'Серии и Туры заездов российского сообществом в Zwift (Звифт)';
  const canonical = serverWoWWW + url;
  const description =
    'Серии и Туры заездов в виртуальном мире Zwift (Звифт) на велотренажерах.';
  const image = 'https://zwiftpower.ru/images/main.jpg';
  const recommendationsTag = 'series';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Статистика"
 */
export const getStatisticsMeta = (url: string): MetaTags => {
  const title = 'Статистика по райдерам и Эвентам в Zwift (Звифт)';
  const canonical = serverWoWWW + url;
  const description =
    'Общая статистика российского сообщества в Zwift (Звифт). Диаграммы по количеству участников в гонках, по возрастным категориям, по типам заездов.';
  const image = 'https://zwiftpower.ru/images/open_graph/5.jpg';
  const recommendationsTag = 'statistics';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Рейтинг райдеров по мощности"
 */
export const getLeadersMeta = (url: string): MetaTags => {
  const gender = url.replace('/race/statistics/leaders/', '');
  const genderStr = gender === 'female' ? 'женщин' : 'мужчин';
  const imageNumber = gender === 'female' ? '8' : '9';

  const title = `Рейтинг райдеров ${genderStr} по мощности в Zwift (Звифт)`;
  const canonical = serverWoWWW + url;
  const description = `Лидеры по абсолютным и удельным ваттам среди ${genderStr} за последние 90 дней. Интервалы 15 секунд, минута, 5 минут и 20 минут.`;
  const image = `https://zwiftpower.ru/images/open_graph/${imageNumber}.jpg`;
  const recommendationsTag = 'leaders';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Статистика райдеров по FTP"
 */
export const getFTPMeta = (url: string): MetaTags => {
  const title = 'Статистика райдеров по FTP в Zwift (Звифт)';
  const canonical = serverWoWWW + url;
  const description =
    'Диаграммы распределения райдеров по FTP (Functional Threshold Power). Диаграммы распределения райдеров по категориям (группам).';
  const image = 'https://zwiftpower.ru/images/open_graph/3.jpg';
  const recommendationsTag = 'ftp';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Статистика райдеров по Racing Score"
 */
export const getRacingScoreMeta = (url: string): MetaTags => {
  const title = 'Статистика райдеров по Racing Score в Zwift (Звифт)';
  const canonical = serverWoWWW + url;
  const description =
    'Диаграммы распределения райдеров по Racing Score (Рейтинговые очки). Диаграммы распределения райдеров по категориям (базовые настройки Звифта).';
  const image = 'https://zwiftpower.ru/images/open_graph/4.jpg';
  const recommendationsTag = 'ftp';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Догонялки (CatchUp)"
 */
export const getCatchupMeta = (url: string): MetaTags => {
  const season = url.replace('/race/series/catchup/', '');
  const title = `Серия заездов Догонялки (CatchUp). Сезон ${season}`;
  const canonical = serverWoWWW + url;
  const description = `Серия заездов Догонялки (CatchUp), проводимых командой KOM-on. Общий зачет за сезон ${season}. Список всех победителей заездов за сезон ${season}.`;
  const image = 'https://zwiftpower.ru/images/open_graph/2.jpg';
  const recommendationsTag = 'catchup';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страниц, не учтенных в данном обработчике"
 */
export const getMetaOtherPages = (url: string): MetaTags => {
  const title = 'Ride On';
  const canonical = serverWoWWW + url;
  const description =
    'Анонсы, расписание, результаты заездов российского сообщества в Zwift (Звифт).';
  const image = 'https://zwiftpower.ru/images/main.jpg';
  const recommendationsTag = 'ban';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Часто задаваемые вопрос"
 */
export const getFaqMeta = (url: string): MetaTags => {
  const title = 'Frequently Asked Questions';
  const canonical = serverWoWWW + url;
  const description =
    'Часто задаваемые вопросы (FAQ). Описание иконок, категорий, поиск джерси из Звифта по названию.';
  const image = 'https://zwiftpower.ru/images/open_graph/4.jpg';
  const recommendationsTag = 'faq';

  return { title, canonical, description, image, recommendationsTag };
};

/**
 * Формирование Мета тегов для страницы "Участники заездов (поиск райдеров)"
 */
export const getRidersMeta = (url: string): MetaTags => {
  const title = 'Участники заездов в Zwift';
  const canonical = serverWoWWW + url;
  const description =
    'Поиск райдеров, которые участвовали в гонках Звифт, опубликованных на сайте zwiftpower.ru';
  const image = 'https://zwiftpower.ru/images/open_graph/11.jpg';
  const recommendationsTag = 'riders';

  return { title, canonical, description, image, recommendationsTag };
};
