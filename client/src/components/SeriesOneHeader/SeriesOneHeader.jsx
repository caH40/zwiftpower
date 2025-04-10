import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';

import styles from './SeriesOneHeader.module.css';

/**
 * Блок-шапка Серии заездов с описанием, итоговыми таблицами, этапами и результатами.
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.name - Название серии.
 * @param {string} [props.mission] - Цель (миссия) серии (опционально).
 * @param {Object.<string, string>} props.posterUrls - Объект с URL-адресами изображений разного размера.
 * @param {(params: {seriesId: string, stageOrder: number}) => Promise<void>} props.updateStageResults -
 *   Функция для обновления/создания результатов этапа серии.
 * @returns {JSX.Element} Возвращает JSX-элемент шапки серии.
 */
export default function SeriesOneHeader({ posterUrls, name, mission, updateStageResults }) {
  return (
    <section className={styles.wrapper}>
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
          <h3 className={styles.title}>{name}</h3>

          {mission && (
            <div className={styles.mission__box}>
              <p className={styles.mission}>{mission}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
