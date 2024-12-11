import styles from './ModeratorDescription.module.css';

function ModeratorDescription() {
  return (
    <article className={styles.article}>
      <h2 className={styles.title}>Управление заездами</h2>
      <ul className={styles.list}>
        <li className={styles.item}>Организатор - команда, организующая Заезды в Звифте.</li>
        <li className={styles.item}>Клуб - клуб в Звифте в котором создаются заезды.</li>
        <li className={styles.item}>У Организатора может быть несколько клубов.</li>
        <li className={styles.item}>
          Клуб привязывается только к одному Организатору при добавлении клуба Организатором на
          сайт <i>zwiftpower.ru</i>
        </li>
        <li className={styles.item}>
          На сайте <i>zwiftpower.ru</i> заезды, созданные в разных клубах одним Организатором,
          будут отображаться как заезды созданные этим Организатором.
        </li>
        <li className={styles.item}>
          Модератор в клуб назначается Организатором. Он может создавать, добавлять, изменять
          заезды только в тех клубах в которых является модератором на сайте{' '}
          <i>zwiftpower.ru</i>
        </li>
        <li className={styles.item}>
          Создание заезда в клубе и изменение настроек на сервере Zwift выполняются ботом,
          добавленным организатором на сайте zwiftpower.ru. Так же бот (аккаунт в Звифте) должен
          состоять в соответствующем клубе в Звифте с правами модератора.
        </li>
      </ul>
    </article>
  );
}

export default ModeratorDescription;
