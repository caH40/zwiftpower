import styles from './VotedPollBlock.module.css';
/**
 * Блок для компонента голосования, отображает:
 * -процентное отношение данного голоса;
 * -название данного голоса;
 * -за данный блок проголосовал или нет пользователь, который видит данное голосование.
 */
export default function VotedPollBlock({ title, percentages, isVoteMine }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textContainer}>
        <div className={styles.percentages}>{percentages}%</div>
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.barsContainer}>
        <div className={styles.checkboxContainer}>
          <img
            src={`/images/icons/${
              isVoteMine ? 'CheckedRoundedCheckbox.svg' : 'EmptyRoundedCheckbox.svg'
            }`}
            className={styles.icon}
            width={16}
            height={16}
          />
        </div>

        <div className={styles.bar} style={{ width: percentages + '%' }} />
      </div>
    </div>
  );
}
