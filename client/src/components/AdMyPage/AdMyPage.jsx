import { Link } from 'react-router-dom';

import styles from './AdMyPage.module.css';

function AdMyPage({ href, title, subtitle, imageSrc }) {
  return (
    <Link to={href} className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.subtitle}>{subtitle}</h3>
      <img className={styles.img} src={imageSrc} alt={title} />
    </Link>
  );
}

export default AdMyPage;
