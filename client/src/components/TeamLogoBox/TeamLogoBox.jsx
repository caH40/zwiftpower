import { Link } from 'react-router-dom';

import MyTooltip from '../../HOC/MyTooltip';
import { generateConsistentDarkColor } from '../../utils/generateDarkColor';
// import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';

import styles from './TeamLogoBox.module.css';

export default function TeamLogoBox({ team }) {
  return (
    <MyTooltip tooltip={team.name}>
      <Link className={styles.link} to={`/teams/${team.urlSlug}/members`}>
        {/* {team.logoUrl ? (
          <AdaptiveImage sources={team.logoUrl} alt={team.name} width={28} height={28} />
        ) : ( */}
        <div
          style={{ backgroundColor: generateConsistentDarkColor(team.shortName) }}
          className={styles.shortName}
        >
          {team.shortName}
        </div>
        {/* )} */}
      </Link>
    </MyTooltip>
  );
}
