import React from 'react';

import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import TextArea from '../TextArea/TextArea';
import MultiSelectRule from '../MultiSelectRule/MultiSelectRule';

import styles from './FormEditEvent.module.css';

function FormEditEvent({ form, setForm, selectedRules, setSelectedRules }) {
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
        name="Время старта (московское время -3ч)"
        state={form}
        setState={setForm}
        property="eventStart"
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
        property="eventType"
        options={[
          { id: 0, name: 'GROUP_RIDE' },
          { id: 1, name: 'RACE' },
        ]}
      />
      <SimpleSelect
        name="cullingType"
        state={form}
        setState={setForm}
        property="cullingType"
        options={[
          { id: 0, name: 'CULLING_SUBGROUP_ONLY' },
          { id: 1, name: 'CULLING_EVENT_ONLY' },
        ]}
      />
      <MultiSelectRule selected={selectedRules} setSelected={setSelectedRules} />
      <SimpleSelect
        name="microserviceEventVisibility"
        state={form}
        setState={setForm}
        property="microserviceEventVisibility"
        options={[
          { id: 0, name: 'DEFINED_BY_RESOURCE_ID' },
          // { id: 1, name: 'PUBLIC' }, ошибка при сохранении
          { id: 1, name: 'SHAREABLE' },
        ]}
      />
      <div className={styles.box__checkbox}>
        <SimpleCheckbox
          state={form}
          setState={setForm}
          property="visible"
          title="visible:"
          toolTip="нет информации о назначении"
        />
        <SimpleCheckbox
          state={form}
          setState={setForm}
          property="categoryEnforcement"
          title="categoryEnforcement:"
          toolTip="Райдер может выступать в своей категории или более высокой"
        />
      </div>
    </form>
  );
}

export default FormEditEvent;
