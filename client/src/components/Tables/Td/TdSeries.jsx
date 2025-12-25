import IconSummer from '../../icons/Seasons/IconSummer';
import IconWinter from '../../icons/Seasons/IconWinter';
import IconSpring from '../../icons/Seasons/IconSpring';
import IconAutumn from '../../icons/Seasons/IconAutumn';
import { AdaptiveImage } from '../../AdaptiveImage/AdaptiveImage';
import MyTooltip from '../../../HOC/MyTooltip';
import SimpleLogo from '../../SimpleLogo/SimpleLogo';

const seasons = ['winter', 'spring', 'summer', 'autumn'];

function TdSeries({ logoFileInfo, seriesName = '' }) {
  if (logoFileInfo) {
    return (
      <td>
        <SimpleLogo squareSize={28} name={seriesName} sources={logoFileInfo} />
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
