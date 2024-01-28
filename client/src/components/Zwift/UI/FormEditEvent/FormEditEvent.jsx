import { useDispatch, useSelector } from 'react-redux';

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
import {
  addGroupToEvent,
  setEventRules,
  setEventTags,
} from '../../../../redux/features/api/zwift_event_params/zwiftEventParamsSlice';
import ButtonCategory from '../../../UI/ButtonCategory/ButtonCategory';
import { labelsSubgroups } from '../../../../assets/subgroups';
import { getAlert } from '../../../../redux/features/alertMessageSlice';
import { optionsRaceTypes } from '../../../../assets/options';

import styles from './FormEditEvent.module.css';

/**
 * Форма изменения настроек для Эвента
 * @param {{isCreating:boolean }} isCreating это форма для создание нового эвента?
 */
function FormEditEvent({ isCreating }) {
  const { subgroupLabels } = useSelector((state) => state.eventParams);
  const dispatch = useDispatch();

  // список групп для добавления
  const labelsSubgroupsForAdd = labelsSubgroups
    .map((label) => label.subgroupLabel)
    .filter((label) => !subgroupLabels.includes(label));

  const { eventMainParams, checkboxRules, checkboxTags } = useSelector(
    (state) => state.eventParams
  );

  const addGroup = (subgroupLabel) => {
    dispatch(addGroupToEvent(subgroupLabel));
    dispatch(
      getAlert({
        message: `Добавлена группа "${subgroupLabel}"`,
        type: 'success',
        isOpened: true,
      })
    );
  };

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
            {getTimerLocal(eventMainParams.eventStart, 'DDMMYYHms', true)}
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

          {/* скрывать блок если форма используется для создания Эвента */}
          {!isCreating && (
            <>
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
            </>
          )}
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

          {!isCreating && (
            <BoxParameter
              title={'Тип заезда для формирования финишного протокола'}
              pen={true}
              inputParams={{
                property: 'typeRaceCustom',
                type: 'select',
                options: optionsRaceTypes,
              }}
              description="Настройка сохраняется в БД и не передается в API Zwift"
            >
              {getNameSelected(optionsRaceTypes, eventMainParams.typeRaceCustom)}
            </BoxParameter>
          )}
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
              reducer={setEventRules}
              key={checkboxRule.id}
              label={checkboxRule.translate}
              value={checkboxRule.checked}
              property={checkboxRule.value}
            />
          ))}

          {checkboxTags.map((checkboxTag) => (
            <RCheckboxArray
              reducer={setEventTags}
              key={checkboxTag.id}
              label={checkboxTag.translate}
              value={checkboxTag.checked}
              property={checkboxTag.value}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className={styles.title__param}>Добавление групп в заезд:</h3>
        <div className={styles.groups}>
          {labelsSubgroupsForAdd.length ? (
            labelsSubgroupsForAdd.map((label) => (
              <ButtonCategory
                key={label}
                tooltip={`Добавить группу ${label}`}
                label={label}
                getClick={addGroup}
              />
            ))
          ) : (
            <span className={styles.subtitle__param}>В Заезд добавлены все группы</span>
          )}
        </div>
      </div>
    </>
  );
}

export default FormEditEvent;
