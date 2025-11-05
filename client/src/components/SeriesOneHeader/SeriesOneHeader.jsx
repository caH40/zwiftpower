import { useSelector } from 'react-redux';
import { useState } from 'react';

import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';
import PopupMenuControlSeries from '../UI/PopupMenuTable/PopupMenuControlSeries';
import IconEdit from '../icons/IconEdit';
import { getTimerLocal } from '../../utils/date-local';
import { getEventStatus } from '../../utils/status';

import styles from './SeriesOneHeader.module.css';

/**
 * Блок-шапка Серии заездов с описанием, итоговыми таблицами, этапами и результатами.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.name - Название серии.
 * @param {string} props.seriesId - Id серии в БД.
 * @param {string} props.mission - Цель (миссия) серии (опционально).
 * @param {number[]} props.stageOrders - Массив с номерами этапов.
 * @param {boolean} props.showEditIcon - Отображать ли иконку управления Серией.
 * @param {string} props.organizerId - Id Организатора заездов.
 * @param {Object.<string, string>} props.posterUrls - Объект с URL-адресами изображений разного размера.
 * @param {string} props.dateStart - Даты в формате ISO.
 * @param {string} props.dateEnd - Даты в формате ISO.
 * @param {'series' | 'tour' | 'catchUp'} props.type - Даты в формате ISO.
 * @returns {JSX.Element} Возвращает JSX-элемент шапки серии.
 */
export default function SeriesOneHeader({
  posterUrls,
  seriesId,
  name,
  mission,
  stageOrders,
  showEditIcon,
  organizerId,
  urlSlug,
  dateStart,
  dateEnd,
  type,
  currentStageOrder,
}) {
  const [isVisibleMenuControl, setIsVisibleMenuControl] = useState(false);
  const { organizer, role } = useSelector((state) => state.checkAuth.value.user);

  // Отображается иконка управления серией только для организатора который создал серию и админа.
  const isSeriesCreator = (organizerId && organizerId === organizer) || role === 'admin';

  const completedText = {
    series: 'Серия завершена',
    tour: 'Тур завершен',
    catchUp: 'Серия завершена',
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.box__edit}>
        {showEditIcon && isSeriesCreator && (
          <>
            <IconEdit
              tooltip={'Управление серией'}
              squareSize={20}
              bgColor={'white'}
              getClick={() => setIsVisibleMenuControl(true)}
            />

            {isVisibleMenuControl && (
              <PopupMenuControlSeries
                seriesId={seriesId}
                stageOrders={stageOrders}
                setIsVisibleMenuControl={setIsVisibleMenuControl}
                urlSlug={urlSlug}
                currentStageOrder={currentStageOrder}
              />
            )}
          </>
        )}
      </div>

      <div className={styles.poster}>
        <div className={styles.poster__placeholder}></div>
        <AdaptiveImage
          sources={posterUrls}
          className={styles.poster__img}
          height={300}
          width={1920}
          alt="Постер Серии"
        />

        {/* Блок с контентом */}
        <div className={styles.content}>
          {/* Блок с лого и названием Организатора */}
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{name}</h3>
            <h4 className={styles.dates}>
              {`${getTimerLocal(dateStart)} - ${getTimerLocal(dateEnd)}`}
            </h4>
          </div>

          {mission && (
            <div className={styles.mission__box}>
              <p className={styles.mission}>{mission}</p>
            </div>
          )}
        </div>

        {getEventStatus(dateStart, dateEnd) === 'completed' && (
          <div className={styles.diagonalRibbon}>
            <div className={styles.ribbonInner}>
              <span className={styles.ribbonText}>{completedText[type]}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
