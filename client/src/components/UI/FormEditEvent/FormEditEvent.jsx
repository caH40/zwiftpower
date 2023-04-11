import React from 'react';

import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import SimpleSelect from '../SimpleSelect/SimpleSelect';

import TextArea from '../TextArea/TextArea';

import styles from './FormEditEvent.module.css';

function FormEditEvent({ form, setForm }) {
  return (
    <form className={styles.form} name="zwiftEvent">
      <SimpleInput
        name="ID заезда"
        state={form}
        setState={setForm}
        property="id"
        type="number"
        disabled={true}
      />
      <SimpleInput
        name="Название заезда"
        state={form}
        setState={setForm}
        property="name"
        type="text"
      />
      <TextArea
        name="Описание для Заезда"
        state={form}
        setState={setForm}
        property="description"
        type="text"
      />
      <SimpleInput
        name="URL картинки для обложки"
        state={form}
        setState={setForm}
        property="imageUrl"
        type="text"
      />
      <SimpleSelect
        name="Тип заезда"
        state={form}
        setState={setForm}
        property="type"
        options={[
          { id: 0, name: 'EVENT_TYPE_GROUP_RIDE' },
          { id: 1, name: 'EVENT_TYPE_RACE' },
        ]}
      />

      {/* <div className={styles.box__checkbox}>
        <SimpleCheckbox
          state={series}
          setState={setSeries}
          property="hasGeneral"
          title="Генеральный зачёт:"
          toolTip="Показывать генеральную квалификацию Серии."
        />
      </div> */}
    </form>
  );
}

export default FormEditEvent;
