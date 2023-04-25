import React from 'react';

import Button from '../Button/Button';
import { eventTypes } from '../../../asset/zwift/event-type';
import { organizers } from '../../../asset/zwift/organizer';
import SimpleSelectArray from '../SimpleSelectArray/SimpleSelectArray';

import styles from './FormAdditionalParamsEvent.module.css';

function FormAdditionalParamsEvent({ form, setForm, sendForm }) {
  return (
    <form className={styles.form} name="requestData">
      <SimpleSelectArray
        name={'Организатор'}
        state={form}
        setState={setForm}
        property={'organizer'}
        options={organizers}
      />
      <SimpleSelectArray
        name={'Тип гонки'}
        state={form}
        setState={setForm}
        property={'raceType'}
        options={eventTypes}
      />
      <div className={styles.right}>
        <Button getClick={sendForm}>Добавить</Button>
      </div>
    </form>
  );
}

export default FormAdditionalParamsEvent;
