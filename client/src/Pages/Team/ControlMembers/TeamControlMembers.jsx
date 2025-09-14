import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useControlTeamMember } from '../../../hook/useControlTeamMember';
import { useMembersForControl } from '../../../hook/useMembersForControl';
import TableTeamMembers from '../../../components/Tables/TableTeamMembers/TableTeamMembers';
import PendingUserControl from '../../../components/UI/PendingUserControl/PendingUserControl';
import TeamMemberControl from '../../../components/UI/TeamMemberControl/TeamMemberControl';

import styles from './TeamControlMembers.module.css';

/**
 * Страница управления участниками команды.
 * Добавление участников (одобрение заявок).
 * Исключение из команды.
 * Блокировка участников.
 */
export default function TeamControlMembersPage() {
  const { urlSlug } = useParams();
  const { team, pendingRiders, bannedRiders } = useSelector((state) => state.team);
  const { teamMembers } = useSelector((state) => state.teamMember);

  useMembersForControl(urlSlug);

  const controlHandlers = useControlTeamMember({ urlSlug });

  return (
    <section className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <TableTeamMembers
          riders={teamMembers.map((m) => ({ ...m.rider, _id: m._id, userId: m.userId }))}
          Control={TeamMemberControl}
          caption={'Участники команды'}
          controlHandlers={controlHandlers}
        />
      </div>

      <div className={styles.tableContainer}>
        <TableTeamMembers
          riders={pendingRiders}
          Control={PendingUserControl}
          caption={'Участники, подавшие заявку на вступление в команду'}
          controlHandlers={controlHandlers}
        />
      </div>
    </section>
  );
}
