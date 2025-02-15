import { Link } from 'react-router-dom';

import CategoryOnlyBox from '../CategoryOnlyBox/CategoryOnlyBox';
import LogoRider from '../LogoRider/LogoRider';

import styles from './RiderStreamBlock.module.css';

/**
 * Компонент для отображения блока райдера: лого и данные.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {TRider} props.rider - Объект с данными о трансляции.
 * @returns {JSX.Element} Блок трансляции Twitch или пустой элемент, если `channelName` отсутствует.
 *
 * @typedef {Object} TRider
 * @property {number} id - Идентификатор Zwift.
 * @property {string} firstName - Имя пользователя.
 * @property {string} lastName - Фамилия пользователя.
 * @property {string} category - Категория пользователя.
 * @property {string} racingScore - Рейтинг пользователя.
 * @property {string} imageSrc - URL изображения профиля.
 * @property {string} countryAlpha3 - Код страны пользователя.
 * @property {boolean} male - Пол пользователя.
 */
export default function RiderStreamBlock({ rider }) {
  const riderName = `${rider.firstName} ${rider.lastName}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.rider}>
        <div className={styles.wrapper__img}>
          <LogoRider
            source={rider.imageSrc}
            firstName={rider.firstName}
            lastName={rider.lastName}
          />
        </div>

        <Link className={'link'} to={`/profile/${rider.id}/results`}>
          {riderName}
        </Link>
      </div>

      <dl className={styles.list}>
        <div className={styles.box__item}>
          <dt className={styles.list__title}>Pace group:</dt>
          <dd className={styles.value}>
            <CategoryOnlyBox label={rider.category} squareSize={20} />
          </dd>
        </div>

        <div className={styles.box__item}>
          <dt className={styles.list__title}>Racing Score:</dt>
          <dd className={styles.value}>
            {rider.racingScore ? (
              Math.trunc(rider.racingScore)
            ) : (
              <CategoryOnlyBox label={rider.racingScore} squareSize={20} />
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}
