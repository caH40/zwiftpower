import YooMoneyButton from '../../UI/YooMoneyButton/YooMoneyButton';

import styles from './DonateYooMoney.module.css';

/**
 * Компонент для отображения блока с кнопкой пожертвования через YooMoney.
 *
 * @param {Object} layoutStyle - Дополнительные пропсы для контейнера (такие как `margin`, `order`).
 * @returns {JSX.Element} Блок с заголовком и кнопкой пожертвования.
 */
export default function DonateYooMoney({ layoutStyle }) {
  return (
    <section className={styles.wrapper} aria-labelledby="donate-title" style={layoutStyle}>
      <h3 id="donate-title" className={styles.title}>
        Поддержать проект
      </h3>

      {/* Кнопка для пожертвования через YooMoney */}
      <YooMoneyButton />
    </section>
  );
}
