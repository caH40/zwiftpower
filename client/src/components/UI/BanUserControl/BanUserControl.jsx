import { IconBan } from '../../icons/IconBan';
import { CancelBanTeamMemberIcon } from '../../icons/TeamMemberControl/CancelBanTeamMemberIcon';

import styles from './BanUserControl.module.css';

/**
 * Блок управления заблокированными пользователем.
 */
export default function BanUserControl({ userId, name, controlHandlers }) {
  return (
    <div className={styles.controlContainer}>
      <CancelBanTeamMemberIcon
        handler={() => controlHandlers.handleCancelBanUser({ userId, name })}
      />
    </div>
  );
}
