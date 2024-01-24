import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';
import { getTimerLocal } from '../../utils/date-local';
import { raceTypes } from '../../assets/zwift/race-type';

/**
 * Формирование Мета тегов для страницы "Зарегистрированные участники"
 */
export const HelmetSignedRiders = ({
  eventId,
  image,
  name,
  eventStart,
  organizer,
  typeRaceCustom,
}) => {
  // подготовка данных
  const eventStartLocal = getTimerLocal(eventStart, 'DDMMYYHm');
  const type = raceTypes.find((race) => race.value === typeRaceCustom)?.name;

  const titleRaw = `Заезд '${name}', ${eventStartLocal}. RideOn`;
  // запрещены двойные кавычки в мета тегах
  const title = titleRaw.replace(/"/g, '');
  const canonical = `${serverFront}/race/schedule/${eventId}`;
  const descriptionRaw = `Описание заезда '${name}'. Зарегистрированные участники. Организатор команда '${organizer}' в Zwift. Тип заезда '${
    type ? type : 'Классический без групп'
  }'.`;
  // запрещены двойные кавычки в мета тегах
  const description = descriptionRaw.replace(/"/g, '');
  // показывать не начавшиеся заезды в расписании
  const today = Date.now();
  const actualPage = new Date(eventStart).getTime() > today;
  const recommendationsTag = actualPage ? 'need_show' : 'ban';

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
