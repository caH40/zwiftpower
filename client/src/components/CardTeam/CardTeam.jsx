import { useNavigate } from 'react-router-dom';

import styles from './CardTeam.module.css';

/**
 * Карточка команды.
 * @param {Object} props - Пропсы.
 * @param {string} props.name - Название.
 * @param {string} props.shortName - Короткое название.
 * @param {string} props.urlSlug - urlSlug для перехода.
 * @param {Record<string,string>} [props.logoUrls] - url логотипа.
 * @param {Record<string,string>} [props.posterUrls] - url постера.
 * @param {string} props._id - id в БД.
 */
export default function CardTeam({ name, shortName, urlSlug, logoUrls, posterUrls }) {
  const navigate = useNavigate();
  const logoSrc = logoUrls?.original;
  const posterSrc = posterUrls?.medium;

  const handleClick = () => {
    if (urlSlug) {
      navigate(`/teams/${urlSlug}/members`);
    }
  };

  return (
    <div className={styles.cardParallax} onClick={handleClick}>
      <div className={styles.background}>
        {posterSrc ? (
          <img src={posterSrc} alt="" className={styles.backgroundImage} />
        ) : (
          <div className={styles.gradientBackground}></div>
        )}
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.logoContainer}>
          {logoSrc ? (
            <img src={logoSrc} alt={name} className={styles.logo} width={120} height={120} />
          ) : (
            <div className={styles.logoPlaceholder}>
              <span className={styles.initials}>{shortName}</span>
            </div>
          )}
        </div>

        <div className={styles.textContent}>
          <h3 className={styles.teamName}>{name}</h3>
          <p className={styles.viewText}>Посмотреть</p>
        </div>
      </div>
    </div>
  );
}
