import styles from './VotedPollBlock.module.css';
/**
 * Блок для компонента голосования, отображает:
 * -чекбокс для выбора пункта голосования;
 * -название данного голоса;
 */
export default function VotePollBlock({ title, isVoteMine }) {
  return (
    <div className={styles.wrapper}>
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

        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
}
