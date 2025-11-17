import styles from './VotedPollBlock.module.css';
/**
 * Блок для компонента голосования, отображает:
 * -чекбокс для выбора пункта голосования;
 * -название данного голоса;
 */
export default function VotePollBlock({
  title,
  isVoteMine,
  setSelectedOptionIds,
  optionId,
  multipleAnswersAllowed,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.barsContainer}>
        <div className={`${styles.checkboxContainer}, ${styles.active}`}>
          <img
            src={`/images/icons/${
              isVoteMine ? 'CheckedRoundedCheckbox.svg' : 'EmptyRoundedCheckbox.svg'
            }`}
            className={styles.icon}
            width={16}
            height={16}
            onClick={() =>
              setSelectedOptionIds((prev) => {
                if (multipleAnswersAllowed) {
                  return prev.includes(optionId)
                    ? [...prev].filter((p) => p !== optionId)
                    : [...prev, optionId];
                } else {
                  return [optionId];
                }
              })
            }
          />
        </div>

        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
}
