import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы "Серии и Туры заездов"
 */
export const HelmetCatchup = ({ season }) => {
  return (
    <Helmet>
      <link rel="canonical" href={`${serverFront}/race/series/catchup/${season}`} />
      <title>{`Серия заездов Догонялки (CatchUp). Сезон ${season}`}</title>
      <meta
        name="description"
        content={`Серия заездов Догонялки (CatchUp), проводимых командой KOM-on. 
        Общий зачет за сезон ${season}. Список всех победителей заездов за сезон ${season}.`}
      />
      <meta
        property="og:title"
        content={`Серия заездов Догонялки (CatchUp). Сезон ${season}`}
      />
      <meta property="og:url" content={`${serverFront}/race/series/catchup/${season}`} />
      <meta
        property="og:description"
        content={`Серия заездов Догонялки (CatchUp), проводимых командой KOM-on. 
        Общий зачет за сезон ${season}. Список всех победителей заездов за сезон ${season}.`}
      />
    </Helmet>
  );
};
