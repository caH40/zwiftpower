import { IconBan } from '../../icons/IconBan';
import IconDelete from '../../icons/IconDelete';
import { BanTeamMemberIcon } from '../../icons/TeamMemberControl/BanTeamMemberIcon';
import { ExcludeTeamMemberIcon } from '../../icons/TeamMemberControl/ExcludeTeamMemberIcon';

import styles from './TeamMemberControl.module.css';

/**
 * Блок управления участником команды.
 */
export default function TeamMemberControl({ userId, name, controlHandlers }) {
  return (
    <div className={styles.controlContainer}>
      <ExcludeTeamMemberIcon
        handler={() => controlHandlers.handleExcludeUser({ userId, name })}
      />

      <BanTeamMemberIcon handler={() => controlHandlers.handleBanUser({ userId, name })} />
    </div>
  );
}
