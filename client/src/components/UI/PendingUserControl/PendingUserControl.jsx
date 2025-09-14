import IconAdd from '../../icons/IconAdd';
import { IconBan } from '../../icons/IconBan';
import IconDelete from '../../icons/IconDelete';
import { ApproveTeamMemberIcon } from '../../icons/TeamMemberControl/ApproveTeamMemberIcon';
import { BanTeamMemberIcon } from '../../icons/TeamMemberControl/BanTeamMemberIcon';
import { RejectTeamMemberIcon } from '../../icons/TeamMemberControl/RejectTeamMemberIcon';

import styles from './PendingUserControl.module.css';

/**
 * Блок управления пользователем, подавшим заявку на вступление в команду.
 */
export default function PendingUserControl({ userId, name, controlHandlers }) {
  return (
    <div className={styles.controlContainer}>
      <ApproveTeamMemberIcon
        handler={() => controlHandlers.handleApproveRequest({ userId, name })}
      />

      <RejectTeamMemberIcon
        handler={() => controlHandlers.handleRejectRequest({ userId, name })}
      />
      <BanTeamMemberIcon handler={() => controlHandlers.handleBanUser({ userId, name })} />
    </div>
  );
}
