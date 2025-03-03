import { Link } from 'react-router-dom';

import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';

import styles from './CardOrganizer.module.css';

/**
 * Карточка организатора
 *
 * Компонент отображает карточку организатора с фоновым изображением, логотипом и названием.
 * Карточка является ссылкой (`<Link>`) на страницу организатора.
 * @param {Object} props - Свойства компонента
 * @param {string} props.name - Название организатора
 * @param {string} props.logoSrc - URL логотипа организатора
 * @param {string} props.backgroundSrc - URL фонового изображения
 *
 * @returns {JSX.Element} Карточка организатора
 */
export default function CardOrganizer({ name, urlSlug, logoUrls, posterUrls }) {
  return (
    <Link to={`${urlSlug?.toLowerCase()}/schedule`} className={styles.card}>
      <div
        className={styles.background}
        // Для фонового изображения карточки достаточно small размера.
        style={{ backgroundImage: `url(${posterUrls?.small || posterUrls?.original})` }}
      ></div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        {/* <img src={logoSrc} alt={name} className={styles.logo} /> */}
        {logoUrls?.original && (
          <AdaptiveImage sources={logoUrls} alt={name} className={styles.logo} />
        )}
        <h2 className={styles.name}>{name}</h2>
      </div>
    </Link>
  );
}
