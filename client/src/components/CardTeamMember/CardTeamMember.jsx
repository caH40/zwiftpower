import { Link } from 'react-router-dom';
import cn from 'classnames';

import Flag from '../Flag/Flag';
import { getAgeCategory } from '../../utils/age';

import MemberParam from './Param/MemberParam';
import MemberStatistics from './Statistics/MemberStatistics';
import styles from './CardTeamMember.module.css';

/**
 * Карточка участника команды.
 */
export default function CardTeamMember({ member: { role, rider } }) {
  // Объект-пустышка на случай если rider undefined
  const riderData = rider || {
    imageSrc: null,
    firstName: 'Не подключен',
    lastName: 'ZwiftId',
    competitionMetrics: { category: 'E' },
    countryAlpha3: 'ru',
    age: null,
    height: null,
    weight: null,
    medals: null,
    totalEvents: 0,
    specialization: '',
    zwiftId: '',
  };

  const {
    imageSrc,
    firstName,
    lastName,
    competitionMetrics,
    countryAlpha3,
    age,
    height,
    weight,
    medals,
    totalEvents,
    specialization,
    zwiftId,
  } = riderData;

  const name = firstName || lastName ? `${firstName} ${lastName}` : 'Zwift Rider';
  const heightStr = height ? `${Math.trunc(height / 10)} см` : 'н/д';
  const weightStr = height ? `${Math.round(weight / 100) / 10} кг` : 'н/д';
  const categoryStr = `Cat ${competitionMetrics?.category || 'н/д'}`;
  const catClass = competitionMetrics?.category ? competitionMetrics.category : 'gray';

  return (
    <Link to={`/profile/${zwiftId}/results`} className={styles.card}>
      {/* Верхняя часть с изображением */}
      <div className={cn(styles.imageContainer, styles[catClass])}>
        {imageSrc ? (
          <img src={imageSrc} alt={`${firstName} ${lastName}`} className={styles.imageLogo} />
        ) : (
          <div className={styles.placeholder}>
            {firstName?.[0]}
            {lastName?.[0]}
          </div>
        )}

        {role && (
          <div className={styles.role}>
            <span>{role}</span>
          </div>
        )}

        <div className={cn(styles.category, styles[catClass])}>{categoryStr}</div>
      </div>

      {/* Нижняя часть карточки */}
      <div className={styles.infoContainer}>
        <div className={styles.nameContainer}>
          <h3 className={styles.name}>{name}</h3>

          <div className={styles.flagContainer}>
            <Flag name={countryAlpha3} width={22} height={18} />
          </div>
        </div>

        <div className={styles.paramsContainer}>
          <MemberParam label={'Возраст'} value={getAgeCategory(age) || 'н/д'} />
          <MemberParam label={'Рост'} value={heightStr} />
          <MemberParam label={'Вес'} value={weightStr} />
        </div>

        <div className={styles.specContainer}>
          <span className={styles.label}>Специализация</span>
          <span className={styles.specValue}>{specialization || 'All-Rounder'}</span>
        </div>

        <div className={styles.statsContainer}>
          <MemberStatistics
            medals={medals}
            racingScore={competitionMetrics?.racingScore || 'н/д'}
          />
        </div>

        <div className={styles.eventsContainer}>
          <span className={styles.label}>Всего заездов:</span>
          <span className={styles.eventValue}>{totalEvents}</span>
        </div>
      </div>
    </Link>
  );
}
