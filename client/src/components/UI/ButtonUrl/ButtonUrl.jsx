import styles from './ButtonUrl.module.css';

/**
 * "Кнопка" ссылка.
 */
export default function ButtonUrl({ href, name, Icon }) {
  return (
    <a href={href} className={styles.btn} target="_blank" rel="noreferrer">
      {Icon && <Icon className={styles.icon} color={'#0f4fa8'} squareSize={24} />}
      {name}
    </a>
  );
}
