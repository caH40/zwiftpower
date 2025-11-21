import { getDeclensionText } from '../../utils/text';
import LogoRider from '../LogoRider/LogoRider';

import styles from './PollResultsPopup.module.css';

export default function PollResultsPopup({
  title,
  options,
  pollAnswers,
  totalAnswers,
  votedUsers,
}) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>

      {options.map((o) => {
        const data = pollAnswers.find(({ optionId }) => o.optionId === optionId);
        const currentAnswers = data?.total ?? 0;

        return (
          <OptionBlock
            key={o.optionId}
            total={currentAnswers}
            title={o.title}
            users={data?.users}
            percentages={Math.floor((currentAnswers * 100) / totalAnswers)}
            totalAnswers={totalAnswers}
          />
        );
      })}

      <div className={styles.footer}>
        Всего проголосовало: {votedUsers} {getDeclensionText(votedUsers, 'user')}
      </div>
    </div>
  );
}

// Обновленный OptionBlock с progress bar
function OptionBlock({ title, total, percentages, users = [] }) {
  return percentages !== 0 ? (
    <section className={styles.optionBlock}>
      <div className={styles.titleContainer}>
        <h4 className={styles.optionTitle}>
          {title} &mdash; <span className={styles.percentages}>{percentages}%</span>
        </h4>
        <div className={styles.stats}>
          {total} {getDeclensionText(total, 'vote')}
        </div>
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
  ) : null;
}
