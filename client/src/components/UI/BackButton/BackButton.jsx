import { Link } from 'react-router-dom';

import styles from './BackButton.module.css';

/**
 * "Кнопка назад"
 * @param {{to:string}} to адрес страницы возврата
 * @returns
 */
function BackButton({ to }) {
  return (
    <Link className={styles.button} to={to}>
      Назад
    </Link>
  );
}

export default BackButton;
