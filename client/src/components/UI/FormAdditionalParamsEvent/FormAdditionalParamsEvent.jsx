import Button from '../Button/Button';
import { raceTypes } from '../../../assets/zwift/race-type';
import SimpleSelectArray from '../SimpleSelectArray/SimpleSelectArray';

import styles from './FormAdditionalParamsEvent.module.css';

function FormAdditionalParamsEvent({ form, setForm, sendForm, series }) {
  return (
    <form className={styles.form} name="requestData">
      <SimpleSelectArray
        name={'Тип гонки'}
        state={form}
        setState={setForm}
        property={'typeRaceCustom'}
        options={raceTypes}
        question={{
          tooltip: 'Параметр отвечает за формирование финишного протокола',
          squareSize: 16,
        }}
      />
      <SimpleSelectArray
        name={'Серия в которую добавляется заезд'}
        state={form}
        setState={setForm}
        property={'seriesId'}
        options={series}
      />

      <div className={styles.right}>
        <Button getClick={sendForm}>Добавить</Button>
      </div>
    </form>
  );
}

export default FormAdditionalParamsEvent;
