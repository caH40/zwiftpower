import LogoRider from '../LogoRider/LogoRider';

import styles from './PollResults.module.css';

export default function PollResultsPopup({ options, pollAnswers, totalAnswers }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Результаты голосования</h3>

      {options.map((o, index) => {
        const data = pollAnswers.find(({ optionId }) => o.optionId === optionId);
        const currentAnswers = data?.total ?? 0;

        return (
          <OptionBlock
            key={o.optionId}
            order={index + 1}
            total={currentAnswers}
            title={o.title}
            users={data?.users}
            percentages={Math.floor((currentAnswers * 100) / totalAnswers)}
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
function OptionBlock({ order, title, total, percentages, users = [] }) {
  return (
    <section className={styles.optionBlock}>
      <div className={styles.titleContainer}>
        <h4 className={styles.optionTitle}>
          {order} - {title}
        </h4>
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
