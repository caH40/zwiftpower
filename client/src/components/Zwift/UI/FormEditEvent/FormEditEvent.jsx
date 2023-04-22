import React from 'react';
import { useSelector } from 'react-redux';

import RInput from '../../../UI/ReduxUI/RInput/RInput';
import RTextarea from '../../../UI/ReduxUI/RTextarea/RTextarea';
import RSelect from '../../../UI/ReduxUI/RSelect/RSelect';
import RCheckbox from '../../../UI/ReduxUI/RCheckbox/RCheckbox';
import RMultiSelectRule from '../../../UI/ReduxUI/RMultiSelectRule/RMultiSelectRule';

import styles from './FormEditEvent.module.css';

function FormEditEvent() {
  const { eventMainParams, selectedRules } = useSelector((state) => state.eventParams);
  return (
    <form className={styles.form} name="zwiftEvent">
      <h4 className={styles.title}>Общие настройки заезда</h4>
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
      <RSelect
        label={'Тип заезда'}
        value={eventMainParams.eventType}
        property={'eventType'}
        options={[
          { id: 0, name: 'GROUP_RIDE' },
          { id: 1, name: 'RACE' },
        ]}
      />
      <RSelect
        label={'cullingType'}
        value={eventMainParams.cullingType}
        property={'cullingType'}
        options={[
          { id: 0, name: 'CULLING_SUBGROUP_ONLY' },
          { id: 1, name: 'CULLING_EVENT_ONLY' },
        ]}
      />
      <RMultiSelectRule selected={selectedRules} />
      <RSelect
        label={'microserviceEventVisibility'}
        value={eventMainParams.microserviceEventVisibility}
        property={'microserviceEventVisibility'}
        options={[
          { id: 0, name: 'DEFINED_BY_RESOURCE_ID' },
          { id: 1, name: 'SHAREABLE' },
          // { id: 2, name: 'PUBLIC' }, ошибка при сохранении
        ]}
      />
      <div className={styles.box__checkbox}>
        <RCheckbox
          label={'visible'}
          value={eventMainParams.visible}
          property={'visible'}
          toolTip="нет информации о назначении"
        />
        <RCheckbox
          label={'categoryEnforcement'}
          value={eventMainParams.categoryEnforcement}
          property={'categoryEnforcement'}
          toolTip="Райдер может выступать в своей категории или более высокой"
        />
      </div>
    </form>
  );
}

export default FormEditEvent;
