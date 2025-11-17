import { useState } from 'react';
import { useSelector } from 'react-redux';

import { getDateStatusForPoll } from '../../utils/poll';
import { usePoll } from '../../hook/usePoll';
import Users from '../Users/Users';
import IconEdit from '../icons/IconEdit';
import PopupMenuPoll from '../UI/PopupMenuTable/PopupMenuPoll';

import VotedPollBlock from './VotedPollBlock/VotedPollBlock';
import VotePollBlock from './VotedPollBlock/VotePollBlock';
import styles from './Poll.module.css';

/**
 * @typedef {Object} TUserWithFLLZ
 * @property {number|null} zwiftId
 * @property {string|null} firstName
 * @property {string|null} lastName
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
 * @property {TUserWithFLLZ[]} users - Пользователи, проголосовавшие за вариант (null для анонимных опросов).
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
  isUserAnswered,
  startDate,
  endDate,
  multipleAnswersAllowed,
}) {
  // При начале голосования, или сбросе для изменения голоса все поля сбрасываются.
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector((state) => state.checkAuth.value.user);
  const isAuth = !!user?.id;
  const dateStatus = getDateStatusForPoll(startDate, endDate);
  const totalAnswers = pollAnswers.reduce((a, c) => a + c.total, 0);

  const sendAnswers = usePoll({ selectedOptionIds, pollId: _id });

  return (
    <div className={styles.wrapper}>
      <div className={styles.editContainer}>
        <IconEdit squareSize={18} getClick={() => setShowMenu((prev) => !prev)} />
      </div>

      {isAuth && showMenu && (
        <div className={styles.popupContainer}>
          <PopupMenuPoll pollId={_id} setShowMenu={setShowMenu} />
        </div>
      )}

      <h4 className={styles.title}>{title}</h4>
      <div className={styles.subtitleContainer}>
        <span className={styles.privateStatus}>
          {isAnonymous ? 'Анонимное голосование' : <Users users={users} />}
        </span>
        <span className={styles.dateStatus}>{dateStatus}</span>
      </div>

      {/* Отображаются разные блоки если пользователь проголосовал или нет */}
      {!isAuth || isUserAnswered ? (
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
                isUserAnswered={isUserAnswered}
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
          isAuth={isAuth}
          isUserAnswered={isUserAnswered}
          answers={users?.length}
          isAnonymous={isAnonymous}
          showResults={() => {
            console.log('Открыть модальное окно с результатами');
          }}
          sendAnswers={sendAnswers}
          notStarted={new Date(startDate) > new Date()}
          finished={new Date() > new Date(endDate)}
        />
      </div>
    </div>
  );
}

function isVoteMine(mineZwiftId, pollAnswers, currentOptionId) {
  return pollAnswers?.some(
    (ans) =>
      ans.optionId === currentOptionId && ans.users?.some((u) => u.zwiftId === mineZwiftId)
  );
}

function RenderActionPollBlock({
  isAuth,
  isUserAnswered,
  isAnonymous,
  answers,
  showResults,
  sendAnswers,
  notStarted,
  finished,
}) {
  // Не авторизован, или уже проголосовал и голосование анонимное.
  if ((isUserAnswered && isAnonymous) || !isAuth) {
    return `${answers} проголосовало`;
  }

  // Авторизован и не проголосовал.
  if (isAuth && !isUserAnswered) {
    return (
      <span>
        {notStarted ? 'Не началось' : null}
        {finished ? 'Завершено' : null}
        {!notStarted && !finished ? (
          <span className={styles.link} onClick={sendAnswers}>
            Проголосовать
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span className={styles.link} onClick={showResults}>
      Результаты
    </span>
  );
}
