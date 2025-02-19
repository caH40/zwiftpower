import BoostyToButton from '../../UI/BoostyToButton/BoostyToButton';
import YooMoneyButton from '../../UI/YooMoneyButton/YooMoneyButton';

import styles from './DonateBlock.module.css';

/**
 * Компонент для отображения блока с кнопкой пожертвования через YooMoney.
 *
 * @param {Object} layoutStyle - Дополнительные пропсы для контейнера (такие как `margin`, `order`).
 * @returns {JSX.Element} Блок с заголовком и кнопкой пожертвования.
 */
export default function DonateBlock({ layoutStyle }) {
  return (
    <section className={styles.wrapper} aria-labelledby="donate-title" style={layoutStyle}>
      <h3 id="donate-title" className={styles.title}>
        Поддержать проект
      </h3>

      <div className={styles.buttons}>
        {/* Кнопка для пожертвования через Boosty.to */}
        <BoostyToButton />

        {/* Кнопка для пожертвования через YooMoney */}
        <YooMoneyButton />
      </div>
    </section>
  );
}
