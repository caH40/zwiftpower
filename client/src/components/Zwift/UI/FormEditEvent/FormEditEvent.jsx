import React from 'react';
import { useSelector } from 'react-redux';

import BoxParameter from '../../../UI/ReduxUI/BoxParameter/BoxParameter';
import { getNameSelected } from '../../../../service/name-selected';
import {
  optionPrivate,
  optionsCulling,
  optionsEventType,
} from '../../../../asset/select/event-edit';

import styles from './FormEditEvent.module.css';

function FormEditEvent() {
  const { eventMainParams } = useSelector((state) => state.eventParams);
  return (
    <div className={styles.form} name="zwiftEvent">
      <h4 className={styles.title}>Общие настройки заезда</h4>
      <BoxParameter title={'ID заезда'}>{eventMainParams.id}</BoxParameter>

      <BoxParameter
        title={'Название'}
        sample={true}
        pen={true}
        inputParams={{ label: 'Название', property: 'name', typeValue: 'text', type: 'input' }}
      >
        {eventMainParams.name}
      </BoxParameter>

      <BoxParameter
        title={'Описание'}
        sample={true}
        pen={true}
        inputParams={{
          label: 'Описание для Заезда',
          property: 'description',
          typeValue: 'text',
          type: 'textarea',
        }}
      >
        {eventMainParams.description}
      </BoxParameter>

      <BoxParameter
        title={'URL картинки для обложки'}
        pen={true}
        inputParams={{
          label: 'URL картинки для обложки',
          property: 'imageUrl',
          typeValue: 'text',
          type: 'input',
        }}
      >
        {eventMainParams.imageUrl}
      </BoxParameter>

      <BoxParameter
        title={'Видимость райдеров'}
        pen={true}
        inputParams={{
          label: 'Видимость райдеров',
          property: 'cullingType',
          type: 'select',
          options: optionsCulling,
        }}
      >
        {getNameSelected(optionsCulling, eventMainParams.cullingType)}
      </BoxParameter>

      <BoxParameter
        title={'Приватность Заезда'}
        pen={true}
        inputParams={{
          label: 'microserviceEventVisibility',
          property: 'microserviceEventVisibility',
          type: 'select',
          options: optionPrivate,
        }}
      >
        {getNameSelected(optionPrivate, eventMainParams.microserviceEventVisibility)}
      </BoxParameter>

      <BoxParameter
        title={'Тип заезда'}
        pen={true}
        inputParams={{
          label: 'Тип заезда',
          property: 'eventType',
          type: 'select',
          options: optionsEventType,
        }}
      >
        {getNameSelected(optionsEventType, eventMainParams.eventType)}
      </BoxParameter>
    </div>
  );
}

export default FormEditEvent;
