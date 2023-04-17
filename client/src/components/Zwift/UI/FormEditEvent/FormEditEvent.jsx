import React from 'react';
import { useSelector } from 'react-redux';

import RInput from '../../../UI/ReduxUI/RInput/RInput';
import RTextarea from '../../../UI/ReduxUI/RTextarea/RTextarea';

import styles from './FormEditEvent.module.css';

function FormEditEvent({}) {
  const { eventMainParams } = useSelector((state) => state.eventParams);
  return (
    <form className={styles.form} name="zwiftEvent">
      <RInput
        label={'ID заезда'}
        value={eventMainParams.id}
        property={'id'}
        type={'number'}
        disabled={true}
      />
      <RInput
        label={'Название заезда'}
        value={eventMainParams.name}
        property={'name'}
        type={'text'}
      />
      <RTextarea
        label={'Описание для Заезда'}
        value={eventMainParams.description}
        property={'description'}
        type={'text'}
      />
      <RInput
        label={'Время старта (московское время -3ч)'}
        value={eventMainParams.eventStart}
        property={'eventStart'}
        type={'text'}
      />
      <RInput
        label={'URL картинки для обложки'}
        value={eventMainParams.imageUrl}
        property={'imageUrl'}
        type={'text'}
      />
    </form>
  );
}

export default FormEditEvent;
