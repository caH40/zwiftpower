import IconDelete from '../../../icons/IconDelete';

import styles from './RInvitedLeadersGroup.module.css';

/**
 * Блок отображения приглашенных лидеров/свиперов с возможностью удаления
 */
function RInvitedLeadersGroup({ leadersType, leaders, deleteLeader }) {
  const type = leadersType === 'invitedLeaders' ? 'Leaders' : 'Sweepers';

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Тип: {type}</h3>
      <div className={styles.block}>
        {leaders.map((leader) => (
          <div className={styles.box__leaders} key={leader}>
            <span className={styles.text}>{leader}</span>
            <IconDelete
              squareSize={16}
              tooltip={`Удалить ${leader}`}
              getClick={() => deleteLeader(leader)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default RInvitedLeadersGroup;
