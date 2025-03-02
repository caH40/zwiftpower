import styles from './MainInfo.module.css';

/**
 * Информационный блок о сайте на главную страницу.
 */
function MainInfo() {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Для чего ZP.ru?</h3>
      <div className={styles.block__text}>
        Сайт создан для корректного формирования протоколов заездов, основанных на правилах,
        созданных организаторами заездов в Звифт.
      </div>

      <h3 className={styles.title}>Улучшение сайта?</h3>
      <div className={styles.block__text}>
        <p>
          Для обратной связи создана группа в телеграмм. Ждем ваших предложений по улучшению и
          добавлению новых фитчей.{' '}
          <a
            className={styles.link}
            target="_blank"
            rel="noreferrer"
            href="https://t.me/zwiftpower"
          >
            https://t.me/zwiftpower
          </a>
        </p>
      </div>
    </div>
  );
}

export default MainInfo;
