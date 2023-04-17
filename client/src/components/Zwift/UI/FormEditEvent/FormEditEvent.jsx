import React from 'react';
import { useSelector } from 'react-redux';

import RInput from '../../../UI/Redux/RInput';

import styles from './FormEditEvent.module.css';

function FormEditEvent({}) {
  const { eventMainParams } = useSelector((state) => state.eventParams);
  return (
    <form className={styles.form} name="zwiftEvent">
      <RInput
        name={'ID заезда'}
        value={eventMainParams.id}
        property={'id'}
        type={'number'}
        disabled={true}
      />
      <RInput
        name={'Название заезда'}
        value={eventMainParams.name}
        property={'name'}
        type={'text'}
      />
      <RInput
        name={'Время старта (московское время -3ч)'}
        value={eventMainParams.eventStart}
        property={'eventStart'}
        type={'text'}
      />
      <RInput
        name={'URL картинки для обложки'}
        value={eventMainParams.imageUrl}
        property={'imageUrl'}
        type={'text'}
      />
    </form>
  );
}

export default FormEditEvent;
