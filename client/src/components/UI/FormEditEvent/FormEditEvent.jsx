import React from 'react';

import { jerseys, routes, worlds } from '../../../asset/zwift/lib/esm/zwift-lib';
import Button from '../Button/Button';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import SelectObject from '../SelectObject/SelectObject';

import styles from './FormEditEvent.module.css';

function FormEditEvent({ form, setForm, sendForm }) {
  console.log(form);
  console.log(worlds.find((world) => world.id === form.worldId).name);

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
      <SimpleInput
        name="URL картинки для обложки"
        state={form}
        setState={setForm}
        property="imageUrl"
        type="text"
      />
      <SelectObject
        name="Мир"
        state={form}
        setState={setForm}
        property="worldId"
        options={worlds.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
        )}
      />
      <SelectObject
        name="Маршрут"
        state={form}
        setState={setForm}
        property="routeId"
        options={routes
          .filter(
            (route) => route.world === worlds.find((world) => world.id === form.worldId).slug
          )
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en'))}
      />
      {/* <SimpleSelect
        name="Джерси заезда"
        state={form}
        setState={setForm}
        property="jerseyHashStr"
        options={jerseys.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
        )}
      /> */}
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

      <div className={styles.right}>
        <Button getClick={sendForm}>сохранить</Button>
      </div>
    </form>
  );
}

export default FormEditEvent;
