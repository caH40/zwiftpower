import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDateStatusForPoll } from '../../utils/poll';
import { usePoll } from '../../hook/usePoll';

import VotedPollBlock from './VotedPollBlock/VotedPollBlock';
import VotePollBlock from './VotedPollBlock/VotePollBlock';
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
  _id,
  title,
  options,
  users,
  pollAnswers,
  isAnonymous,
  startDate,
  endDate,
  multipleAnswersAllowed,
}) {
  // При начале голосования, или сбросе для изменения голоса все поля сбрасываются.
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.checkAuth.value.user);

  const dateStatus = getDateStatusForPoll(startDate, endDate);
  const totalAnswers = pollAnswers.reduce((a, c) => a + c.total, 0);

  // Пользователь просматривающий голосование проголосовал?
  const isUserVoted = user?.zwiftId && !!users.find((u) => u.zwiftId === user?.zwiftId);

  const sendAnswers = usePoll({ selectedOptionIds, pollId: _id });

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.subtitleContainer}>
        <span className={styles.privateStatus}>
          {isAnonymous ? 'Анонимное голосование' : 'Блок кто проголосовал:'}
        </span>
        <span className={styles.dateStatus}>{dateStatus}</span>
      </div>

      {/* Отображаются разные блоки если пользователь проголосовал или нет */}
      {isUserVoted ? (
        <div className={styles.voteBlocksWrapper}>
          {options.map((option) => {
            const currentAnswers =
              pollAnswers.find(({ optionId }) => option.optionId === optionId)?.total ?? 0;

            return (
              <VotedPollBlock
                key={option.optionId}
                isVoteMine={
                  user.zwiftId && isVoteMine(user.zwiftId, pollAnswers, option.optionId)
                }
                percentages={Math.floor((currentAnswers * 100) / totalAnswers)}
                title={option.title}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.voteBlocksWrapper}>
          {options.map(({ optionId, title }) => (
            <VotePollBlock
              key={optionId}
              isVoteMine={selectedOptionIds.includes(optionId)}
              title={title}
              setSelectedOptionIds={setSelectedOptionIds}
              optionId={optionId}
              multipleAnswersAllowed={multipleAnswersAllowed}
            />
          ))}
        </div>
      )}

      <div className={styles.results}>
        <RenderActionPollBlock
          notAuth={user?._id}
          isUserVoted={isUserVoted}
          votes={users?.length}
          isAnonymous={isAnonymous}
          showResults={() => {
            console.log('Открыть модальное окно с результатами');
          }}
          sendAnswers={sendAnswers}
        />
      </div>
    </div>
  );
}

function isVoteMine(mineZwiftId, pollAnswers, currentOptionId) {
  return pollAnswers.some(
    (ans) =>
      ans.optionId === currentOptionId && ans.users.some((u) => u.zwiftId === mineZwiftId)
  );
}

function RenderActionPollBlock({
  notAuth,
  isUserVoted,
  isAnonymous,
  answers,
  showResults,
  sendAnswers,
}) {
  // Не авторизован, или уже проголосовал и голосование анонимное.
  if ((isUserVoted && isAnonymous) || notAuth) {
    return `${answers} проголосовало`;
  }

  // Авторизован и не проголосовал.
  if (!notAuth && !isUserVoted) {
    return (
      <span className={styles.link} onClick={sendAnswers}>
        Проголосовать
      </span>
    );
  }

  return (
    <span className={styles.link} onClick={showResults}>
      Результаты
    </span>
  );
}
