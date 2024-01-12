import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы результаты Эвента
 */
export const HelmetRaceResults = ({
  eventId,
  image,
  name,
  eventStart,
  clubName,
  typeRaceCustom,
}) => {
  return (
    <Helmet>
      <link rel="canonical" href={`${serverFront}/race/results/${eventId}`} />
      <title>{`Результаты заезда "${name}"`}</title>
      <meta
        name="description"
        content={`Результаты заезда "${name}" от ${eventStart}, 
        организованного командой ${clubName} в виртуальном мире Zwift (Звифт).
        Тип заезда "${typeRaceCustom ? typeRaceCustom : 'Классический без групп'}".`}
      />
      <meta property="og:title" content={`Результаты заезда "${name}"`} />
      <meta property="og:url" content={`${serverFront}/race/results/${eventId}`} />
      <meta
        property="og:description"
        content={`Результаты заезда "${name}" от ${eventStart}, 
        организованного командой ${clubName} в виртуальном мире Zwift (Звифт).
        Тип заезда "${typeRaceCustom ? typeRaceCustom : 'Классический без групп'}".`}
      />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};
