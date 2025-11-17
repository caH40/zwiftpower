import styles from './VotedPollBlock.module.css';
/**
 * Блок для компонента голосования, отображает:
 * -чекбокс для выбора пункта голосования;
 * -название данного голоса;
 */
export default function VotePollBlock({
  title,
  isVoteMine,
  setAnswers,
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
              setAnswers((prev) => {
                if (multipleAnswersAllowed) {
                  return [...prev].map((p) =>
                    p.optionId === optionId ? { optionId: p.optionId, checked: !p.checked } : p
                  );
                } else {
                  return [...prev].map(
                    (p) =>
                      p.optionId === optionId
                        ? { optionId: p.optionId, checked: true }
                        : { optionId: p.optionId, checked: false } // Может быть выбрано только одна опция.
                  );
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
