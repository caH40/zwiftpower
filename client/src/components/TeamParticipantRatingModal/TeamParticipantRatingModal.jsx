import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoRider from '../LogoRider/LogoRider';
import { closePopupFormContainer } from '../../redux/features/popupFormContainerSlice';
import IconQuestion from '../icons/IconQuestion';

import styles from './TeamParticipantRatingModal.module.css';

/**
 * Результат участника, учтённый в командном рейтинге.
 *
 * @typedef {Object} TTeamParticipantRatingResult
 * @property {number} id Внутренний идентификатор строки.
 * @property {number} points Количество очков участника.
 * @property {number} rank Занятое место.
 * @property {{ importance: number }} coefficients Коэффициенты заезда.
 * @property {{ id: number, name: string, start: string }} event Данные эвента.
 * @property {{ name: string, urlSlug: string, stageOrder?: number } | null} series Серия заездов.
 * @property {string | null} resultPath Путь к результатам.
 * @property {*} profileData Данные райдера (placeholder).
 */

/**
 * Модальное окно со вкладом участников в командный рейтинг.
 *
 * @param {{
 *   results: TTeamParticipantRatingResult[],
 *   onClose: () => void
 * }} props
 */
export default function TeamParticipantRatingModal({ results }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Вклад участников в рейтинг команды{' '}
          <Link
            to={'/documentation/public/team-ranking?extension=md'}
            onClick={() => dispatch(closePopupFormContainer())}
          >
            <IconQuestion
              squareSize={20}
              tooltip={'Алгоритм начисления рейтинговых очков командам'}
            />
          </Link>
        </h2>
      </div>

      <div className={styles.table}>
        <div className={`${styles.row} ${styles.head}`}>
          <div>#</div>
          <div>Райдер</div>
          <div>Очки</div>
          <div>Место</div>
          <div>Эвент</div>
          <div>Коэф. важности (V)</div>
          <div>Коэф. массовости (K)</div>
        </div>

        {results.map(({ profileData, ...item }, index) => (
          <div key={item.id} className={styles.row}>
            <div>{index + 1}</div>

            <div className={styles.profileCell}>
              <div className={styles.riderContainer}>
                <div className={styles.logoContainer}>
                  <LogoRider
                    source={profileData.imageSrc}
                    firstName={profileData.firstName}
                    lastName={profileData.lastName}
                  />
                </div>

                <span>{`${profileData.firstName} ${profileData.lastName}`}</span>
              </div>
            </div>

            <div className={styles.points}>{item.points}</div>
            <div>{item.rank}</div>

            <div className={styles.event}>
              <Link
                to={item.resultPath}
                className={`${styles.eventName} link`}
                onClick={() => dispatch(closePopupFormContainer())}
              >
                {item.event.name}
              </Link>
              <div className={styles.eventDate}>
                {new Date(item.event.start).toLocaleDateString()}
              </div>
            </div>

            <div>{item.coefficients.importance}</div>
            <div>{item.coefficients.mass}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
