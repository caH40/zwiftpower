import styles from './FaqBlock.module.css';

function FaqVarious() {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>FAQ</h3>
      <div className={styles.box__question}>
        <p className={styles.question}>
          Отсутствуют данные Critical Power в результатах заезда и в профайле райдера.
        </p>
        <p className={`${styles.text} ${styles.text__answer}`}>
          У райдера в Звифте установлена приватность на просмотр своих заездов. Закрыт просмотр
          для всех кроме друзей, или закрыт для всех. Для отображения этих данных необходимо
          добавить в друзья "райдера" с ником "Race-Info".
        </p>
      </div>
    </div>
  );
}

export default FaqVarious;