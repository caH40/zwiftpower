import { Link } from 'react-router-dom';

import MyTooltip from '../../HOC/MyTooltip';
import { generateConsistentDarkColor } from '../../utils/generateDarkColor';

import styles from './TeamLogoBox.module.css';

export default function TeamLogoBox({ team, background, color }) {
  const backgroundColor = background || generateConsistentDarkColor(team.shortName);
  const textColor = color || '#FFFFFF';
  return (
    <MyTooltip tooltip={team.name}>
      <Link className={styles.link} to={`/teams/${team.urlSlug}/members`}>
        <div
          style={{
            backgroundColor,
            color: textColor,
            border: `1px solid ${textColor}`,
            outline: `1px solid ${backgroundColor}`,
          }}
          className={styles.shortName}
        >
          {team.shortName}
        </div>
      </Link>
    </MyTooltip>
  );
}
