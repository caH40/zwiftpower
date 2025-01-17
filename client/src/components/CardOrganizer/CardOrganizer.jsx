import { Link } from 'react-router-dom';

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
export default function CardOrganizer({ name, logoSrc, backgroundSrc }) {
  return (
    <Link to={name?.toLowerCase()} className={styles.card}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundSrc})` }}
      ></div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        {/* <img src={logoSrc} alt={name} className={styles.logo} /> */}
        {logoSrc ? (
          <img src={logoSrc} alt={name} className={styles.logo} />
        ) : (
          <div className={styles.logo} />
        )}
        <h2 className={styles.name}>{name}</h2>
      </div>
    </Link>
  );
}
