import styles from './RInvitedLeadersGroup.module.css';

/**
 * Блок отображения приглашенных лидеров/свиперов с возможностью удаления
 */
function RInvitedLeadersGroup({ leadersType, leaders }) {
  const type = leadersType === 'invitedLeaders' ? 'Leaders' : 'Sweepers';
  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Тип: {type}</h3>
      <div className={styles.box__leaders}>{leaders}</div>
    </section>
  );
}

export default RInvitedLeadersGroup;
