import { useSelector } from 'react-redux';

import { getDateStatusForPoll } from '../../utils/poll';

import VotedPollBlock from './VotedPollBlock/VotedPollBlock';

import styles from './Poll.module.css';

/**
 * @typedef {Object} TUserWithFLLZ
 * @property {number} zwiftId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string|null} imageSrc
 */

/**
 * @typedef {Object} TPollOption
 * @property {number} optionId - Локальный ID варианта внутри опроса.
 * @property {string} title - Текст варианта ответа.
 */

/**
 * @typedef {Object} PollAnswer
 * @property {number} optionId - ID варианта ответа.
 * @property {number} total - Количество голосов за этот вариант.
 * @property {TUserWithFLLZ[]|null} users - Пользователи, проголосовавшие за вариант (null для анонимных опросов).
 */

/**
 * @typedef {Object} TPollWithAnswersDto
 * @property {string} _id - ID опроса.
 * @property {string} creator - ID создателя голосования.
 * @property {string} title - Заголовок опроса.
 * @property {TPollOption[]} options - Варианты ответа.
 * @property {TUserWithFLLZ[]} users - Все проголосовавшие пользователи в порядке возрастания времени голосования.
 * @property {boolean} isAnonymous - Анонимное голосование.
 * @property {boolean} multipleAnswersAllowed - Возможность выбрать несколько вариантов.
 * @property {string} startDate - Дата начала опроса (строка).
 * @property {string} endDate - Дата окончания опроса (строка).
 * @property {string} createdAt - Дата создания записи (строка).
 * @property {string} updatedAt - Дата обновления записи (строка).
 * @property {PollAnswer[]} pollAnswers - Результаты голосования.
 */

/**
 * Окно голосования.
 * @param {TPollWithAnswersDto} props - Данные опроса с результатами голосования.
 */
export default function Poll({
  title,
  totalAnswers = 5,
  pollAnswers = [
    {
      optionId: 1,
      total: 2,
      users: [
        { zwiftId: 169979, firstName: 'Alex', lastName: 'vales' },
        { zwiftId: 1699792, firstName: 'Vano', lastName: 'Dles' },
      ],
    },
    {
      optionId: 2,
      total: 3,
      users: [
        { zwiftId: 16999, firstName: 'M', lastName: 'Doter' },
        { zwiftId: 16499792, firstName: 'Uno', lastName: 'Boo' },
        { zwiftId: 164939792, firstName: 'GsUno', lastName: 'FBoSo' },
      ],
    },
  ],
  users = [
    { zwiftId: 16999, firstName: 'M', lastName: 'Doter' },
    { zwiftId: 16499792, firstName: 'Uno', lastName: 'Boo' },
    { zwiftId: 164939792, firstName: 'GsUno', lastName: 'FBoSo' },
    { zwiftId: 169979, firstName: 'Alex', lastName: 'vales' },
    { zwiftId: 1699792, firstName: 'Vano', lastName: 'Dles' },
  ],
  isAnonymous,
  startDate,
  endDate,
}) {
  const userZwiftId = useSelector((state) => state.checkAuth.value.user?.zwiftId);

  const dateStatus = getDateStatusForPoll(startDate, endDate);

  // Пользователь просматривающий голосование проголосовал?
  const isUserVoted = userZwiftId && users.find((u) => u.zwiftId === userZwiftId);

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.subtitleContainer}>
        <span className={styles.privateStatus}>
          {isAnonymous ? 'Анонимное голосование' : 'Блок кто проголосовал:'}
        </span>
        <span className={styles.dateStatus}>{dateStatus}</span>
      </div>

      <div className={styles.voteBlocksWrapper}>
        {pollAnswers.map((option) => (
          <VotedPollBlock
            key={option.optionId}
            isVoteMine={userZwiftId && option.users.some((u) => u.zwiftId === userZwiftId)}
            percentages={Math.floor((option.total * 100) / totalAnswers)}
            title={'Участвую'}
          />
        ))}
      </div>

      <div className={styles.results}>
        {isAnonymous
          ? users.length + ' проголосовало'
          : isUserVoted
          ? 'Результаты'
          : 'Проголосовать'}
      </div>
    </div>
  );
}
