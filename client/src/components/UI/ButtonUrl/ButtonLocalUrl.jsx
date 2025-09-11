import { Link } from 'react-router-dom';

import styles from './ButtonUrl.module.css';

/**
 * "Кнопка" ссылка.
 * @param {string} href - Ссылка.
 */
export default function ButtonLocalUrl({ href, children }) {
  return (
    <Link to={href} className={styles.btn} rel="noreferrer">
      {children}
    </Link>
  );
}
