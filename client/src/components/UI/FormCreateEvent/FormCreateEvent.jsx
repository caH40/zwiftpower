import React from 'react';

import Button from '../Button/Button';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import SimpleSelect from '../SimpleSelect/SimpleSelect';

import styles from './FormCreateEvent.module.css';

function FormCreateEvent({ form, setForm, sendForm }) {
  return (
    <form className={styles.form} name="zwiftEvent">
      {/* <SimpleInput
        name="ID заезда"
        state={form}
        setState={setForm}
        property="eventId"
        type="number"
      /> */}
      {/* <SimpleSelect
        name="Тип серии"
        state={series}
        setState={setSeries}
        property="type"
        options={[
          { name: 'series', id: '1' },
          { name: 'tour', id: '2' },
        ]}
      />
      <SimpleSelect
        name="Организатор"
        state={series}
        setState={setSeries}
        property="organizer"
        options={[{ name: 'KOM-ON', id: '1' }]}
      />

      <div className={styles.box__checkbox}>
        <SimpleCheckbox
          state={series}
          setState={setSeries}
          property="hasGeneral"
          title="Генеральный зачёт:"
          toolTip="Показывать генеральную квалификацию Серии."
        />

        <SimpleCheckbox
          state={series}
          setState={setSeries}
          property="hasTeams"
          title="Командный зачёт:"
          toolTip="Показывать командный зачёт Серии."
        />
      </div> */}

      <div className={styles.right}>
        <Button getClick={sendForm}>сохранить</Button>
      </div>
    </form>
  );
}

export default FormCreateEvent;
