import { Link } from 'react-router-dom';

import styles from './CardSeries.module.css';

/**
 * Карточка организатора.
 *
 * Карточка является ссылкой (`<Link>`) на страницу Серии.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.name - Название Серии.
 * @param {string} props.backgroundSrc - URL фонового изображения.
 *
 * @returns {JSX.Element} Карточка организатора
 */
export default function CardSeries({ name, urlSlug, posterUrls }) {
  return (
    <Link to={`/series/${urlSlug?.toLowerCase()}`} className={styles.card}>
      <div
        className={styles.background}
        // Для фонового изображения карточки достаточно small размера.
        style={{ backgroundImage: `url(${posterUrls?.small || posterUrls?.original})` }}
      ></div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h2 className={styles.name}>{name}</h2>
      </div>
    </Link>
  );
}
