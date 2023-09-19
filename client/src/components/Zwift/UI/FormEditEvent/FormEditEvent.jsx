import React from 'react';
import { useSelector } from 'react-redux';

import BoxParameter from '../../../UI/ReduxUI/BoxParameter/BoxParameter';
import { getNameSelected } from '../../../../service/name-selected';
import {
  optionPrivate,
  optionsCulling,
  optionsEventType,
} from '../../../../assets/select/event-edit';
import RCheckbox from '../../../UI/ReduxUI/RCheckbox/RCheckbox';
import RCheckboxArray from '../../../UI/ReduxUI/RCheckbox/RCheckboxArray';
import { getTimerLocal } from '../../../../utils/date-local';

import styles from './FormEditEvent.module.css';

function FormEditEvent() {
  const { eventMainParams, checkboxRules } = useSelector((state) => state.eventParams);

  return (
    <>
      <h4 className={styles.title}>Общие настройки заезда</h4>
      <div className={styles.form} name="zwiftEvent">
        <div className={styles.box__inputs}>
          <BoxParameter title={'ID заезда'}>{eventMainParams.id}</BoxParameter>

          <BoxParameter
            title={'Дата и время старта'}
            sample={true}
            pen={true}
            inputParams={{
              label: 'Дата и время старта',
              property: 'eventStart',
              typeValue: 'dateAndTime',
              type: 'inputTime',
              value: eventMainParams.eventStart,
            }}
          >
            {getTimerLocal(eventMainParams.eventStart, 'DDMMYYHm', true)}
          </BoxParameter>

          <BoxParameter
            title={'Название'}
            sample={true}
            pen={true}
            inputParams={{
              label: 'Название',
              property: 'name',
              typeValue: 'text',
              type: 'input',
            }}
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

        <div className={styles.box__checkbox}>
          <RCheckbox
            label={'Строгая категоризация'}
            value={eventMainParams.categoryEnforcement}
            property={'categoryEnforcement'}
            tooltip="Райдер может выступать в своей категории или более высокой"
          />
          {checkboxRules.map((checkboxRule) => (
            <RCheckboxArray
              key={checkboxRule.id}
              label={checkboxRule.translate}
              value={checkboxRule.checked}
              property={checkboxRule.value}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default FormEditEvent;
