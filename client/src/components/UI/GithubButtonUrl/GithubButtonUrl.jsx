import { Link } from 'react-router-dom';

import styles from './GithubButtonUrl.module.css';

/**
 * Кнопка-ссылка в стиле GitHub.
 * @param {string} href - Ссылка
 * @param {ReactNode} children - Содержимое кнопки
 */
export default function GithubButtonUrl({ href, children }) {
  return (
    <Link to={href} className={styles.btn}>
      {children}
    </Link>
  );
}
