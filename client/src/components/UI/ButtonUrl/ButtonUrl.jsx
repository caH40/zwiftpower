import styles from './ButtonUrl.module.css';

/**
 * "Кнопка" ссылка.
 * @param {string} href - Ссылка или deeplink.
 * @param {string} name - Текст кнопки.
 * @param {React.Component} Icon - Иконка (React-компонент).
 * @param {boolean} isZwiftCompanionLink - Флаг, указывающий, что это deeplink для Zwift Companion.
 */
export default function ButtonUrl({ href, name, Icon, isZwiftCompanionLink = false }) {
  // Обработчик клика для deeplink
  const handleClick = (e) => {
    if (isZwiftCompanionLink) {
      e.preventDefault(); // Отменяем стандартное поведение ссылки
      window.open(href, 'join_zwift_event'); // Открываем deeplink в новом окне
    }
  };

  return href ? (
    <a
      href={href}
      className={styles.btn}
      target={isZwiftCompanionLink ? '_self' : '_blank'} // Открываем в текущей вкладке для deeplink
      rel="noreferrer"
      onClick={handleClick} // Добавляем обработчик клика
    >
      {Icon && <Icon className={styles.icon} color={'#0f4fa8'} squareSize={24} />}
      {name}
    </a>
  ) : null;
}
