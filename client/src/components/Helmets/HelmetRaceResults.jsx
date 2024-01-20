import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';
import { getTimerLocal } from '../../utils/date-local';
import { raceTypes } from '../../assets/zwift/race-type';

/**
 * Формирование Мета тегов для страницы "Результаты заезда"
 */
export const HelmetRaceResults = ({
  eventId,
  image,
  name,
  eventStart,
  organizer,
  typeRaceCustom,
}) => {
  // подготовка данных
  const eventStartLocal = getTimerLocal(eventStart, 'DDMMYY');
  const type = raceTypes.find((race) => race.value === typeRaceCustom)?.name;

  const titleRaw = `Результаты заезда '${name}'`;
  // запрещены двойные кавычки в мета тегах
  const title = titleRaw.replace(/"/g, '');
  const canonical = `${serverFront}/race/results/${eventId}`;
  const descriptionRaw = `Результаты заезда '${name}' от ${eventStartLocal}, организованного командой '${organizer}' в виртуальном мире Zwift (Звифт). Тип заезда '${
    type ? type : 'Классический без групп'
  }'.`;
  // запрещены двойные кавычки в мета тегах
  const description = descriptionRaw.replace(/"/g, '');
  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};
