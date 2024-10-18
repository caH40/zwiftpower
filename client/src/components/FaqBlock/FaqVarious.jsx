import styles from './FaqBlock.module.css';

function FaqVarious() {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>FAQ</h2>
      <div className={styles.box__question}>
        <p className={styles.question}>
          Отсутствуют данные Critical Power, Normalized Power или Racing Score в результатах
          заезда, в регистрации Эвента и в профиле райдера.
        </p>
        <p className={`${styles.text} ${styles.text__answer}`}>
          У райдера в Звифте установлена приватность на просмотр своих заездов или профиля.
          Закрыт просмотр для всех кроме друзей, или закрыт для всех.
        </p>
      </div>

      <div className={styles.box__question}>
        <p className={styles.question}>У меня несколько аккаунтов в Звифт.</p>
        <div className={`${styles.text} ${styles.text__answer}`}>
          На странице "Профиль пользователя" в "Настройках" необходимо найти свой дополнительный
          аккаунт в Звифте. Отметить его как дополнительный. Сохранить.
          <p>Все результаты заездов этого аккаунта добавятся в основной.</p>
          <p>
            На страницах "Описание заезда", "Результаты заезда", "Лидеры мощности" произойдет
            подмена дополнительного аккаунта на основной.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FaqVarious;
