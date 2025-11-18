import LogoRider from '../LogoRider/LogoRider';

import styles from './PollResults.module.css';

export default function PollResultsPopup({ pollAnswers, totalAnswers }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Результаты голосования</h3>

      {pollAnswers.map((ans, index) => {
        return (
          <OptionBlock
            key={ans.optionId}
            order={index + 1}
            total={ans.total}
            users={ans.users}
            percentages={totalAnswers ? Math.floor((ans.total * 100) / totalAnswers) : 'н/д'}
            totalAnswers={totalAnswers}
          />
        );
      })}

      <div className={styles.footer}>
        Всего проголосовало: {totalAnswers} {getVoteText(totalAnswers)}
      </div>
    </div>
  );
}

// Обновленный OptionBlock с progress bar
function OptionBlock({ order, total, percentages, users }) {
  return (
    <section className={styles.optionBlock}>
      <div className={styles.titleContainer}>
        <h4 className={styles.optionTitle}>Вариант {order}</h4>
        <div className={styles.stats}>
          {total} {getVoteText(total)} - {percentages}%
        </div>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${percentages}%` }} />
      </div>

      <div className={styles.usersContainer}>
        {users.map(({ imageSrc, lastName, firstName, zwiftId }) => (
          <div key={zwiftId} className={styles.riderContainer}>
            <div className={styles.logoContainer}>
              <LogoRider source={imageSrc} firstName={firstName} lastName={lastName} />
            </div>
            <span>{`${firstName} ${lastName}`}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function getVoteText(count) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'голос';
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'голоса';
  } else {
    return 'голосов';
  }
}
