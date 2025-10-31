import { Link } from 'react-router-dom';

import styles from './TeamRow.module.css';

export default function TeamRow({ urlSlug, name, shortName, logoUrls }) {
  return (
    <Link className={styles.wrapper} to={`/teams/${urlSlug}/members`}>
      <img src={logoUrls.original} className={styles.logoImg} height={60} width={60} />
      <span>{name}</span>
    </Link>
  );
}
