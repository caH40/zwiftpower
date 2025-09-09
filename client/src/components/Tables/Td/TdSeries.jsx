import React from 'react';

import IconSummer from '../../icons/Seasons/IconSummer';
import IconWinter from '../../icons/Seasons/IconWinter';
import IconSpring from '../../icons/Seasons/IconSpring';
import IconAutumn from '../../icons/Seasons/IconAutumn';
import { AdaptiveImage } from '../../AdaptiveImage/AdaptiveImage';
import MyTooltip from '../../../HOC/MyTooltip';

const seasons = ['winter', 'spring', 'summer', 'autumn'];

function TdSeries({ logoFileInfo, seriesName = '' }) {
  if (logoFileInfo) {
    return (
      <td>
        <MyTooltip tooltip={seriesName}>
          <div>
            <AdaptiveImage
              height={28}
              width={28}
              sources={logoFileInfo}
              fallbackSrc={'/images/transparent.png'}
              alt={seriesName}
            />
          </div>
        </MyTooltip>
      </td>
    );
  }

  const seasonCurrent = seriesName
    .split(' ')
    .find((elm) => seasons.includes(elm.toLowerCase()));

  const getLogo = (season) => {
    switch (season?.toLowerCase()) {
      case 'summer':
        return <IconSummer tooltip={seriesName} />;
      case 'winter':
        return <IconWinter tooltip={seriesName} />;
      case 'spring':
        return <IconSpring tooltip={seriesName} />;
      case 'autumn':
        return <IconAutumn tooltip={seriesName} />;
      default:
        return null;
    }
  };

  return <td>{getLogo(seasonCurrent)}</td>;
}

export default TdSeries;
