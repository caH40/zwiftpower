import styles from './BoostyToButton.module.css';

/**
 * Кнопка для поддержки разработчика через Boosty.to
 *
 * @component
 * @returns {JSX.Element} Компонент кнопки донатов на Boosty.
 */
export default function BoostyToButton() {
  return (
    <div className={styles.wrapper} role="button">
      <img
        src="/images/icons/boostyTo.svg"
        className={styles.icon}
        width={24}
        height={24}
        alt="Boosty Logo"
      />

      <a
        href="https://boosty.to/berezhnev-aleksander/donate"
        target="_blank"
        className={styles.button}
        rel="noopener noreferrer"
      >
        Кофе для разработчика
      </a>
    </div>
  );
}
