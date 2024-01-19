import { serverFront } from '../config/environment.js';

type Tags = { title: string; canonical: string; description: string; image: string };
/**
 * Выбор соответствующих Мета тэгов
 */
export const getMetaTags = (url: string): Tags => {
  // объявление переменных для тэгов
  let t, d, i;

  // канонический адрес страницы
  let c = serverFront + url;

  if (url === '/') {
    // ========== "Домашняя" ==========
    t = 'Анонсы ближайших заездов российского сообщества в Zwift (Звифт)';
    d = 'Анонсы ближайших заездов в виртуальном мире Zwift (Звифт) на велотренажерах.';
    c = `${serverFront}`;
    i = 'https://zwiftpower.ru/images/main.jpg';
  } else if (url === '/race/schedule') {
    // ========== "Расписание заездов" ==========
    t = 'Расписание заездов российского сообщества в Zwift (Звифт)';
    d =
      'Расписание групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах.';
    i = 'https://zwiftpower.ru/images/main.jpg';
  } else if (url === '/race/results') {
    // ========== "Результаты заездов" ==========
    t = 'Результаты заездов российского сообщества в Zwift (Звифт)';
    d =
      'Результаты групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах.';
    i = 'https://zwiftpower.ru/images/main.jpg';
  } else if (url === '/race/series') {
    // ========== "Серии и Туры заездов" ==========
    t = 'Серии и Туры заездов российского сообществом в Zwift (Звифт)';
    d = 'Серии и Туры заездов в виртуальном мире Zwift (Звифт) на велотренажерах.';
    i = 'https://zwiftpower.ru/images/main.jpg';
  } else if (url === '/race/statistics/main') {
    // ========== "Статистика" ==========
    t = 'Статистика по райдерам и Эвентам в Zwift (Звифт)';
    d =
      'Общая статистика российского сообщества в Zwift (Звифт). Диаграммы по количеству участников в гонках, по возрастным категориям, по типам заездов.';
    i = 'https://zwiftpower.ru/images/open_graph/5.jpg';
  } else if (url.includes('/race/statistics/leaders/')) {
    const genderStr = url.replace('/race/statistics/leaders/', '');
    const imageNumber = genderStr === 'female' ? '8' : '9';
    // ========== "Рейтинг райдеров по мощности" ==========
    t = `Рейтинг райдеров ${genderStr} по мощности в Zwift (Звифт)`;
    d = `Лидеры по абсолютным и удельным ваттам среди ${genderStr} за последние 90 дней. Интервалы 15 секунд, минута, 5 минут и 20 минут.`;
    i = `https://zwiftpower.ru/images/open_graph/${imageNumber}.jpg`;
  } else if (url === '/race/statistics/riders-ftp') {
    // ========== "Статистика райдеров по FTP" ==========
    t = 'Статистика райдеров по FTP в Zwift (Звифт)';
    d =
      'Диаграммы распределения райдеров по FTP (Functional Threshold Power). Диаграммы распределения райдеров по категориям (группам).';
    i = 'https://zwiftpower.ru/images/open_graph/3.jpg';
  } else if (url.includes('/race/series/catchup/')) {
    const season = url.replace('/race/series/catchup/', '');
    // ========== "Догонялки (CatchUp)" ==========
    t = `Серия заездов Догонялки (CatchUp). Сезон ${season}`;
    d = `Серия заездов Догонялки (CatchUp), проводимых командой KOM-on. Общий зачет за сезон ${season}. Список всех победителей заездов за сезон ${season}.`;
    i = 'https://zwiftpower.ru/images/open_graph/2.jpg';
  } else {
    // ========== для страниц не учтенных в данном обработчике ==========
    t = 'Ride On';
    d = 'Анонсы, расписание, результаты заездов российского сообщества в Zwift (Звифт).';
    i = 'https://zwiftpower.ru/images/main.jpg';
  }

  // console.log({ t, c, d, i });

  return { title: t, canonical: c, description: d, image: i };
};
