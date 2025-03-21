import Button from '../Button/Button';

import SimpleSelectArray from '../SimpleSelectArray/SimpleSelectArray';

import styles from './FormAdditionalParamsEvent.module.css';

function FormAdditionalParamsEvent({ form, setForm, sendForm, series, configsFinishProtocol }) {
  return (
    <form className={styles.form} name="requestData">
      <div>
        <SimpleSelectArray
          name={'Конфигурация финишного протокола'}
          state={form}
          setState={setForm}
          property={'typeRaceCustom'}
          options={configsFinishProtocol.map((elm) => ({
            id: elm.id,
            value: elm.name,
            name: elm.translate,
          }))}
          question={{
            tooltip: 'Параметр отвечает за формирование финишного протокола',
            squareSize: 16,
          }}
        />
      </div>

      <div>
        {/* Добавление События в Серию заездов */}
        <SimpleSelectArray
          name={'Серия в которую добавляется заезд'}
          state={form}
          setState={setForm}
          property={'seriesId'}
          options={series}
        />
      </div>

      <div className={styles.right}>
        <Button getClick={sendForm}>Добавить</Button>
      </div>
    </form>
  );
}

export default FormAdditionalParamsEvent;
