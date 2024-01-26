import FormCreateEvent from '../../components/Zwift/UI/FormCreateEvent/FormCreateEvent';
import useTitle from '../../hook/useTitle';

import styles from './ZwiftCreateEvent.module.css';

function ZwiftCreateEvent() {
  useTitle('Создание заезда в Zwift');

  return (
    <section className={styles.block}>
      <h2 className={styles.title}>
        Создание заезда в Zwift происходит в 2 этапа:
        <br />
        1. Создается заезд с минимально необходимыми настройками.
        <br />
        2. Детальная настройка заезда.
      </h2>
      <div className={styles.group}>
        <FormCreateEvent />
      </div>
    </section>
  );
}

export default ZwiftCreateEvent;
