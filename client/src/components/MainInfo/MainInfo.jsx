import styles from './MainInfo.module.css';

const raceTypes = [
  { id: 0, name: 'догонялки' },
  { id: 1, name: 'для новичков' },
  { id: 2, name: 'классический' },
  { id: 3, name: 'классический без групп' },
  { id: 4, name: 'объём' },
];

function MainInfo() {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Для чего ZP.ru?</h3>
      <div className={styles.block__text}>
        Сайт создан для корректного формирования протоколов заездов, основанных на правилах,
        созданных организаторами заездов в Звифт.
      </div>
      <h3 className={styles.title}>Какие типы заездов?</h3>
      <div className={styles.block__text}>
        На данный момент поддерживаются следующие типы заездов, проводимые командой{' '}
        <strong>"KOM-on"</strong>:
        <ul className={styles.list}>
          {raceTypes.map((race) => (
            <li className={styles.item} key={race.id}>
              <span className={styles.text}>{race.name}</span>
            </li>
          ))}
        </ul>
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
