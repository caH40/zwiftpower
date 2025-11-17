import styles from './VotedPollBlock.module.css';
/**
 * Блок для компонента голосования, отображает:
 * -процентное отношение данного голоса;
 * -название данного голоса;
 * -за данный блок проголосовал или нет пользователь, который видит данное голосование.
 */
export default function VotedPollBlock({ title, percentages, isVoteMine, isUserAnswered }) {
  const barWidth = percentages !== 0 ? percentages : 1;
  return (
    <div className={styles.wrapper}>
      <div className={styles.textContainer}>
        <div className={styles.percentages}>{percentages}%</div>
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.barsContainer}>
        <div className={styles.checkboxContainer}>
          {isUserAnswered && isVoteMine ? (
            <img
              src={`/images/icons/${
                isVoteMine ? 'CheckedRoundedCheckbox.svg' : 'EmptyRoundedCheckbox.svg'
              }`}
              className={styles.icon}
              width={16}
              height={16}
            />
          ) : null}
        </div>

        <div className={styles.bar} style={{ width: barWidth + '%' }} />
      </div>
    </div>
  );
}
